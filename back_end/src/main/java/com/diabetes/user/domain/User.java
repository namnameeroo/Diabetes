package com.diabetes.user.domain;

import com.diabetes.common.domain.BaseTimeEntity;
import com.diabetes.food.Food;
import com.diabetes.user.dto.UserRequestDto;
import com.diabetes.user.dto.UserResponseDto;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

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

    private String email;
    private String name;
//    private String password;

    @Enumerated(EnumType.STRING)
    private RoleType role;
    @Enumerated(EnumType.STRING)
    private UserStatus status;
    @Enumerated(EnumType.STRING)
    private GenderType gender;
    private String age;
    private LocalDate birthday;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "authProvider")
    private AuthProviderType authProviderType;
//    @Column(length = 512)
    private String accessToken;
//
//    @Column(length = 512)
//    private String refreshToken;

    @OneToMany(mappedBy = "user")
    private List<Food> foodList;
    // enum은 항상 static
    // 내부 클래스는 static!! 외부 참조 발생 주의!
    public enum GenderType {
        FEMALE, MALE
    }

    public User modify(UserRequestDto userRequestDto) {
        this.name = userRequestDto.getName();
        this.age = userRequestDto.getAge();
        this.gender = userRequestDto.getGender();

        return this;
    }

    public UserResponseDto toResponseDto() {
        return UserResponseDto.builder()
                .id(this.id)
                .authId(this.authId)
                .email(this.email)
                .name(this.name)
                .gender(this.gender)
                .age(this.age)
                .authProvider(this.authProviderType)
                .FoodListCount(this.foodList.size())
                .build();
    }
}
