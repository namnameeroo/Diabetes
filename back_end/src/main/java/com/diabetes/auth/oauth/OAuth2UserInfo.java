package com.diabetes.auth.oauth;

import com.diabetes.user.domain.AuthProviderType;
import com.diabetes.user.domain.RoleType;
import com.diabetes.user.domain.User;
import com.diabetes.user.domain.UserStatus;

import java.util.Map;

public abstract class OAuth2UserInfo {
  Map<String, Object> attributes;

  public OAuth2UserInfo(Map<String, Object> attributes) {
      this.attributes = attributes;
  }

  public Map<String, Object> getAttributes() {
      return attributes;
  }

  public abstract AuthProviderType getProviderType();

  public abstract String getId();

  public abstract String getName();

  public abstract String getEmail();

  public abstract String getImageUrl();

  public User toEntity() {

    return User.builder()
            .name(getName())
            .email(getEmail())
            .imageUrl(getImageUrl())
            .role(RoleType.USER)
            .status(UserStatus.Normal)
            .authProviderType(getProviderType())
            .build();
  }
}