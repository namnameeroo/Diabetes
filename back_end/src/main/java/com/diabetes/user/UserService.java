package com.diabetes.user;

import com.diabetes.auth.oauth.OAuth2UserInfo;
import com.diabetes.common.exception.DuplicatedResoureException;
import com.diabetes.user.domain.User;
import com.diabetes.user.dto.UserRequestDto;
import com.diabetes.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserResponseDto findUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Not Registered User Mail"));
        return user.toResponseDto();
    }

    @Transactional(readOnly = true)
    public UserResponseDto findUserByAuthId(String authId) {
        User user = userRepository.findByAuthId(authId)
                .orElseThrow(()-> new IllegalArgumentException("찾는 사용자가 존재하지 않습니다."));
        return user.toResponseDto();

    }

    @Transactional(readOnly = true)
    public UserResponseDto findUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("찾는 사용자가 존재하지 않습니다."));
        return user.toResponseDto();
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);

    }

    @Transactional(readOnly = true)
    public Page<UserResponseDto> findAllUsersWithFoodListCount(Pageable pageable) {

        Page<UserResponseDto> userResponseDtoList = userRepository.findAllWithFoodList(pageable)
                .map(user -> user.toResponseDto());

        return userResponseDtoList;
    }

    @Transactional
    public UserResponseDto updateUserInfo(Long userId, UserRequestDto userRequestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("찾는 사용자가 존재하지 않습니다."));

        UserResponseDto userResponseDto = user.modify(userRequestDto).toResponseDto();
        return userResponseDto;

    }

    @Transactional
    public User registerForOauth2(OAuth2UserInfo oAuth2UserInfo) throws DuplicatedResoureException {

        User user = oAuth2UserInfo.toEntity();
        log.info("register New User : {}", user);
        User newUser = userRepository.save(user);

        return newUser;
    }

}
