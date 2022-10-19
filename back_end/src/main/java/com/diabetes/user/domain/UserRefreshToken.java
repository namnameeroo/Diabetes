package com.diabetes.user.domain;

import com.diabetes.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
@Table(name = "USER_REFRESH_TOKEN")
@Entity
public class UserRefreshToken {

    @Id
    @Column(name = "REFRESH_TOKEN_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshTokenSeq;

    @NotNull
    @Size(max = 64)
    @OneToOne(fetch = FetchType.LAZY)
    private User user; // user의 id와 연결 전략 고민...

    @NotNull
    @Size(max = 512)
    @Column(name = "REFRESH_TOKEN", length = 512)
    private String refreshToken;

    public UserRefreshToken(User user, String refreshToken) {
        this.user = user;
        this.refreshToken = refreshToken;
    }
}
