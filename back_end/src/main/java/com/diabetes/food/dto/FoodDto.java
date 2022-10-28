package com.diabetes.food.dto;

import com.diabetes.food.GLResult;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;


@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
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

    // GLResultType(현재 Food 엔티티의 내부 클래스)을 쓸지 String을 쓸지 고민
    @NotNull
    @Valid
    private GLResult result;

    public void checkUserId(Long userId) {
        if (!this.userId.equals(userId)) {
            // TODO 에러를 던질 것인지?
            this.userId = userId;
        }
    }
}
