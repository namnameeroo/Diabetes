package com.diabetes.auth.config;

import com.diabetes.auth.security.CustomAuthenticationEntryPoint;
import com.diabetes.auth.security.CustomAuthorizationRequestResolver;
import com.diabetes.auth.security.OAuth2AuthenticationSuccessHandler;
import com.diabetes.common.properties.RedirectProperties;
import com.diabetes.user.domain.RoleType;
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
    private final RedirectProperties redirectProperties;

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
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .logout()
                .logoutUrl("/api/v1/auth/logout")
                .logoutSuccessUrl(redirectProperties.getLogoutUrl()) // 로그아웃 성공시 리다이렉트 주소
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .and()
                .authorizeHttpRequests((authz) -> authz
                        // TODO 아래 접근에 대해서 관리자만 접근 가능하도록 제한 설정을 해둘 필요성!
                        .antMatchers("/actuator/health", "/h2-console/**").permitAll()
                        .antMatchers("/", "/css/**", "/images/**").permitAll()
                        .antMatchers("/v3/api-docs", "/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**").hasRole(RoleType.ADMIN.toString())
                        .antMatchers("/api/v1/auth/**").permitAll()
                        .antMatchers("/api/v1/admin/**").hasRole(RoleType.ADMIN.toString())
                        .antMatchers("/api/v1/foods", "/api/v1/foods/**", "/api/v1/users/**").hasRole(RoleType.USER.toString()) // ROLE_{} 형태
                        .anyRequest().authenticated()
                )
                .oauth2Login()
                .defaultSuccessUrl(redirectProperties.getSuccessUrl(), true)
                .failureUrl(redirectProperties.getFailureUrl())
                .authorizationEndpoint()
                .and()
                .userInfoEndpoint();

        http
                .exceptionHandling()
                .authenticationEntryPoint(customAuthenticationEntryPoint);	// 401 자동 구글 로그인 url로 이동하는 것 방지

        return http.build();
    }
}
