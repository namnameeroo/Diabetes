package com.diabetes.food.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Builder
@AllArgsConstructor
public class FoodDto {

    private Long id;
    @NotNull
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
    private Float intake;
    @NotNull
    private Float gl;
    @NotNull
    private String result;

    public void checkUserId(Long userId) {
        if (!this.userId.equals(userId)) {
            // TODO 에러를 던질 것인지?
            this.userId = userId;
        }
    }
}
