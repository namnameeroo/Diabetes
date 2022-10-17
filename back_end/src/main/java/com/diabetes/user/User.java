package com.diabetes.user;

import com.diabetes.common.domain.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

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

    private String imgUrl;

    private Integer age;
    private GenderType gender;

    enum GenderType {
        F, M
    }
}
