package com.diabetes.auth.oauth;

import com.diabetes.user.domain.AuthProviderType;
import com.diabetes.user.domain.RoleType;
import com.diabetes.user.domain.User;
import com.diabetes.user.domain.UserStatus;

import java.time.LocalDate;
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

  public abstract User.GenderType getGender();

  public abstract LocalDate getBirthday();

  public abstract String getAge();

  public abstract String getEmail();

  public abstract String getImageUrl();

  public User toEntity() {

    return User.builder()
            .authId(getId())
            .name(getName())
            .email(getEmail())
            .gender(getGender())
            .birthday(getBirthday())
            .age(getAge())
            .imageUrl(getImageUrl())
            .role(RoleType.USER)
            .status(UserStatus.NORMAL)
            .authProviderType(getProviderType())
            .build();
  }
}