package com.diabetes.auth.security;


import com.diabetes.auth.oauth.OAuth2UserInfoFactory;
import com.diabetes.common.exception.OAuthProcessingException;
import com.diabetes.auth.oauth.OAuth2UserInfo;
import com.diabetes.user.domain.AuthProviderType;
import com.diabetes.user.domain.User;
import com.diabetes.user.UserRepository;
import com.diabetes.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

        // 써드파티에 OAuth2UserRequest 를 보내고 받은 응답값에 있는 Access Token으로 유저정보 get
        OAuth2User oAuth2User = delegate.loadUser(oAuth2UserRequest);

        return process(oAuth2UserRequest, oAuth2User);
    }

    // TODO readonly 트랜잭션 전파 체크해보기 (https://code-mania.tistory.com/m/143)
    // 획득한 유저정보를 Java Model과 매핑하고 프로세스 진행
    // 트랜잭션은 퍼블릭 메소드여야 하는 것 같음. 프록시 패턴을 활용하기 위해서 퍼블릭이어야 한다고... 확인해보기
    @Transactional
    public OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        AuthProviderType authProviderType = AuthProviderType.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());

        String accessToken = oAuth2UserRequest.getAccessToken().getTokenValue();
        // 이왕 팩토리패턴을 적용하니, 인터페이스를 사용
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProviderType, oAuth2User.getAttributes(), accessToken);

        // 유저 정보 조회
        Optional<User> userOptional = userRepository.findByAuthId(userInfo.getId());
        User user;

        if (userOptional.isPresent()) {	// 이미 가입된 경우

            user = userOptional.get();
            if (authProviderType.equals(user.getAuthProviderType().name())) {
                throw new OAuthProcessingException("Wrong Match Auth Provider");
            }
            // TODO 새로 조회한 유저 정보가 변경되었을 수 있으니 갱신시켜준다.

        } else { // 가입되지 않은 경우
            user = userService.registerForOauth2(userInfo);
        }

        // TODO 구글의 경우 oAuth2UserRequest 들어있는 access_token 과 id_token 처리 방법
        // 토큰을 저장할지 vs. 바로 people api를 활용해서 사용자의 추가 정보를 로드해오기만 할지...
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }


}