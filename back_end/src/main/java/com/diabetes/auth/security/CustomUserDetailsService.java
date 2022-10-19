package com.diabetes.auth.security;

import com.diabetes.user.UserRepository;
import com.diabetes.user.domain.UserStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        Optional<UserPrincipal> userPrincipal = userRepository.findByEmail(email)
                .map(user -> {
                    if (user.getStatus() == UserStatus.Normal) {
                        throw new RuntimeException(email + "-> 활성화되어 있지 않습니다.");
                    } else {
                        return UserPrincipal.create(user);
                    }
                });
        return userPrincipal.orElseThrow(() -> new UsernameNotFoundException(email + "-> 데이터베이스에서 찾을 수 없습니다."));
    }
}
