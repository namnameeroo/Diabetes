package com.diabetes.user.domain;

import com.diabetes.common.domain.BaseTimeEntity;
import com.diabetes.food.Food;
import com.diabetes.user.RoleTypeSetConverter;
import com.diabetes.user.dto.UserRequestDto;
import com.diabetes.user.dto.UserResponseDto;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Convert(converter = RoleTypeSetConverter.class)
    private Set<RoleType> roles = new HashSet<>();

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

    // TODO 여러 role을 가지는 경우가 존재할 것인가? 필요하다면 set으로 관리하는 것으로 변경
    public User addAdminRole() {
        this.roles.add(RoleType.ADMIN);
        return this;
    }

    public UserResponseDto toResponseDto() {
        return UserResponseDto.builder()
                .id(this.id)
                .authId(this.authId)
                .authProvider(this.authProviderType)
                .role(this.roles.contains(RoleType.ADMIN)?RoleType.ADMIN:RoleType.USER)
                .email(this.email)
                .name(this.name)
                .gender(this.gender)
                .age(this.age)
                .FoodListCount(this.foodList.size())
                .createdDate(this.getCreatedDate())
                .build();
    }
}
