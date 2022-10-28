package com.diabetes.auth.security;

import com.diabetes.user.domain.RoleType;
import com.diabetes.user.domain.User;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class UserPrincipal implements UserDetails, OAuth2User {
    private Long id;
    private String authId;
    //private String password;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    @Builder
    public UserPrincipal(Long id, String authId, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.authId = authId;
       //this.password = password;
        this.email = email;
        this.authorities = authorities;
    }

    /* default login */
    public static UserPrincipal create(User user) {

        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode()));

        return UserPrincipal.builder()
                .id(user.getId())
                .authId(user.getAuthId())
                .email(user.getEmail())
                //.password(user.getPassword())
                .authorities(authorities)
                .build();
    }

    /* oauth login */
    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    // UserDetail Override
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return authId;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // OAuth2User Override
    @Override
    public String getName() { return authId; }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    private void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Long getId() {
        return id;
    }
}