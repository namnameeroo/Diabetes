package com.diabetes.user.domain;


import com.diabetes.common.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="users")
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String oauthId;
    private String email;
    private String password;
    private UserStatus status;
    private RoleType role;
    private AuthProviderType authProviderType;

    private String imageUrl;
    private Integer age;
    private GenderType gender;

    // enum은 항상 static
    // 내부 클래스는 static!! 외부 참조 발생 주의!
    public enum GenderType {
        F, M
    }

}
