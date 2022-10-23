package com.diabetes.user.domain;


import com.diabetes.common.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="users")
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String authId;
    private String password;

    private String email;
    private String name;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Enumerated(EnumType.STRING)
    private AuthProviderType authProviderType;

    private String imageUrl;
    private Integer age;
    @Enumerated(EnumType.STRING)
    private GenderType gender;

    // enum은 항상 static
    // 내부 클래스는 static!! 외부 참조 발생 주의!
    public enum GenderType {
        F, M
    }

}
