package com.diabetes.auth.oauth;

import antlr.StringUtils;
import com.diabetes.user.domain.AuthProviderType;
import com.diabetes.user.domain.User;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    private static final AuthProviderType authProviderType = AuthProviderType.GOOGLE;
    private Map<String, List<Map>> additionalUserInfo;
    private LocalDate birthday;
    private String age;
    private String accessToken;

    public GoogleOAuth2UserInfo(Map<String, Object> attributes, String accessToken) { //Map<String, List<Map>> additionalUserInfo,
        super(attributes);
       // this.additionalUserInfo = additionalUserInfo;
       //  this.birthday = parseBirthday();
       //  this.age = calculateAge();
        this.accessToken = accessToken;
    }

    private LocalDate parseBirthday() {
        if (additionalUserInfo == null) {
            return null;
        }

        Map<String, Integer> birthday = (Map<String, Integer>) Optional.ofNullable(additionalUserInfo.get("birthdays"))
                .orElseGet(() ->{
                    Map<String, Integer> emptyMap = Collections.<String, Integer>emptyMap();
                    Map<String, Map<String, Integer>> map =  Map.of(
                            "date", emptyMap
                    );
                    return List.of(map);
                } )
                .get(0)
                .get("date");

        if (birthday.equals(Collections.<String, Integer>emptyMap())) return null;

        // 생년월일 String to Date
        LocalDate parsedBirthday = LocalDate.of(birthday.get("year"), birthday.get("month"), birthday.get("day"));

        return parsedBirthday;
    }

    private String calculateAge() {

        if (this.birthday == null) return null;

        LocalDate today = LocalDate.now();
        Period period = Period.between(this.birthday, today);
        String age = Integer.toString(period.getYears());
        return age;
    }

    @Override
    public AuthProviderType getProviderType() {
        return authProviderType;
    }
    @Override
    public String getId() {
        return attributes.get("sub").toString();
    }
    @Override
    public String getName() {
        return (String) attributes.get("name");
    }
    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public User.GenderType getGender() {
        if (additionalUserInfo == null) {
            return null;
        }

        String gender = Optional.ofNullable(additionalUserInfo.get("genders"))
                .orElseGet(() ->{
                    Map<String, String> map =  Map.of(
                            "value", ""
                    );
                    return List.of(map);
                } )
                .get(0)
                .get("value")
                .toString()
                .toUpperCase(); // Female, Male

        return gender.equals("")?null:Enum.valueOf(User.GenderType.class, gender);
    }

    @Override
    public LocalDate getBirthday() {
        return this.birthday;
    }

    @Override
    public String getAge() {
        return this.age;
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }

}