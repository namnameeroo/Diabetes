package com.diabetes.user.dto;

import com.diabetes.user.domain.AuthProviderType;
import com.diabetes.user.domain.RoleType;
import com.diabetes.user.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    @NotNull
    private Long id;

    @NotNull
    @Size(min = 5, max = 100)
    private String authId;

    @Size(min = 5, max = 100)
    private String email;

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @NotNull
    private AuthProviderType authProvider;

    private RoleType role;
    private String age;
    private User.GenderType gender;
    private long FoodListCount;
}