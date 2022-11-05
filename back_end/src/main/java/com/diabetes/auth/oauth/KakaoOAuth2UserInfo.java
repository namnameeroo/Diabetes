package com.diabetes.auth.oauth;

import com.diabetes.user.domain.AuthProviderType;
import com.diabetes.user.domain.User;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    private static final AuthProviderType authProviderType = AuthProviderType.KAKAO;
    private Map<String, Object> attributesAccount;
    private Map<String, Object> attributesProfile;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        // 카카오 응답값 기준 파싱
        this.attributesAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.attributesProfile = (Map<String, Object>) attributesAccount.get("profile");
    }

    @Override
    public AuthProviderType getProviderType() {
        return authProviderType;
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        if (attributesAccount == null) {
            return null;
        }
        return (String) attributesAccount.get("email");
    }

    @Override
    public String getName() {
        if (attributesProfile == null) {
            return null;
        }
        return (String) attributesProfile.get("nickname");
    }

    @Override
    public User.GenderType getGender() {
        if (attributesProfile == null) {
            return null;
        }
        String gender = attributesAccount.get("gender").toString().toUpperCase();
        return gender.equals("")?null:Enum.valueOf(User.GenderType.class, gender);
    }

    @Override
    public LocalDate getBirthday() {
        if (attributesAccount == null) {
            return null;
        }
        // TODO 카카오에서 생년을 받아오기 위해서는 앱이 정식 등록되어야 하는 듯
        LocalDate parsedBirthday = LocalDate.parse(attributesAccount.get("birthday").toString(), DateTimeFormatter.ofPattern("MMdd"));

        return parsedBirthday;
    }

    @Override
    public String getAge() {
        if (attributesAccount == null) {
            return null;
        }
        return attributesAccount.get("age_range").toString();
    }

    @Override
    public String getImageUrl() {
        if (attributesProfile == null) {
            return null;
        }
        return (String) attributesProfile.get("profile_image");
    }

}