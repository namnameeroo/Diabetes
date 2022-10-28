package com.diabetes.user.dto;

import com.diabetes.user.domain.AuthProviderType;
import com.diabetes.user.domain.User;
import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {

// 이메일 변경을 위해서는 인증 필요
//    @Size(min = 5, max = 100)
//    private String email;

    // TODO 확인 -> 어떤 정보까지 변경을 허용하는지...
    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @NotNull
    private String age;

    @NotNull
    @Valid
    private User.GenderType gender;
}
