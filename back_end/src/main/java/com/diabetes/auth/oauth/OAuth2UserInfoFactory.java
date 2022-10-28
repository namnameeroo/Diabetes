package com.diabetes.auth.oauth;

import com.diabetes.user.domain.AuthProviderType;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class OAuth2UserInfoFactory {
    
    public static OAuth2UserInfo getOAuth2UserInfo(AuthProviderType authProvider, Map<String, Object> attributes, String accessToken) {
        switch (authProvider) {
            case GOOGLE:
                // 구글에서 고객의 성별, 연령대를 가져오기 위해 People Api를 추가로 호출한다.
                GoogleAdditionalUserInfoHandler additionalUserInfoHandler = new GoogleAdditionalUserInfoHandler();
                Map<String, List<Map>> additionalUserInfo = additionalUserInfoHandler.getAdditionalUserInfo(accessToken);
                return new GoogleOAuth2UserInfo(attributes, additionalUserInfo);
                
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            //case NAVER: return new NAVEROAuth2UserInfo(attributes);
            //case GITHUB: return new GithubOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
