package com.diabetes.auth.config;

import com.diabetes.auth.security.CustomAuthenticationEntryPoint;
import com.diabetes.auth.security.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    /*
     * security 설정 시, 사용할 인코더 설정
     * */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable() //ignoringAntMatchers("/h2-console/**") // h2-console 페이지가 csrf 대응이 되어있지 않으므로 예외로 둔다.
                //.and()
                .headers().frameOptions().disable()
                .and()
                .authorizeHttpRequests((authz) -> authz
                        // TODO 아래 접근에 대해서 관리자만 접근 가능하도록 제한 설정을 해둘 필요성!
                        .antMatchers("/actuator/health", "/h2-console/**").permitAll()
                        .antMatchers("/api/v1/admin/**").permitAll()
                        .antMatchers("/", "/css/**", "/images/**").permitAll()
                        .antMatchers("/api/v1/auth/**").permitAll()
                        .antMatchers("/api/v1/foods", "/api/v1/foods/**", "/api/v1/users/**").permitAll() //.hasRole(RoleType.USER.getCode())
                        .anyRequest().authenticated()
                )
                .oauth2Login()
                .defaultSuccessUrl("/api/v1/users/me", true)
                .authorizationEndpoint()
                .and()
                .userInfoEndpoint();
//                .and()
//                .successHandler(oAuth2AuthenticationSuccessHandler);
        http
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint);	// 401 자동 구글 로그인 url로 이동하는 것 방지

        return http.build();
    }
}
