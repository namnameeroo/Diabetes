package com.diabetes.user;

import com.diabetes.auth.oauth.OAuth2UserInfo;
import com.diabetes.common.exception.DuplicatedResoureException;
import com.diabetes.user.domain.User;
import com.diabetes.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserDto findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Not Registered User Mail"));

        return UserDto.builder()
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }

    @Transactional(readOnly = true)
    public UserDto findUserByAuthId(String authId) {
        User user = userRepository.findByAuthId(authId)
                .orElseThrow(()-> new IllegalArgumentException("찾는 사용자가 존재하지 않습니다."));

        return UserDto.builder()
                .authId(user.getAuthId())
                .email(user.getEmail())
                .name(user.getName())
                .build();

    }

    @Transactional(readOnly = true)
    public UserDto findUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("찾는 사용자가 존재하지 않습니다."));
        return UserDto.builder()
                .authId(user.getAuthId())
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);

    }

    @Transactional
    public User registerForOauth2(OAuth2UserInfo oAuth2UserInfo) throws DuplicatedResoureException {

        User user = oAuth2UserInfo.toEntity();
        log.info("register New User : {}", user);
        User newUser = userRepository.save(user);

        return newUser;
    }

}
