package com.diabetes.food.dto;

import com.diabetes.food.GLResult;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.util.Assert;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;


@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@AllArgsConstructor
public class FoodReqDto {

    private Long userId;
    @NotNull
    private String name;
    @NotNull
    private String provider;
    @NotNull
    private Float entireWeight;
    @NotNull
    private Float calories;
    @NotNull
    private Float carbohydrate;
    @NotNull
    private Float protein;
    @NotNull
    private Float fat;
    @NotNull
    private Float fiber;
    @NotNull
    private Float intake;
    @NotNull
    private Float gl;
    @NotNull
    @Valid
    private GLResult result;

    public void checkUserId(Long userId) {
        if (!this.userId.equals(userId)) {
            // TODO 에러를 던질 것인지?
            this.userId = userId;
        }
    }

    public void assignUserId(Long userId) {
        this.userId = userId;
    }

    public void checkUserIdNotNull() {
        Assert.notNull(this.userId, "USER ID NEEDED");
    }

}
