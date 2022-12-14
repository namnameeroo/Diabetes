package com.diabetes.food.dto;

import com.diabetes.food.GLResult;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@AllArgsConstructor
@NotNull
public class FoodResDto {

    private Long id;
    private Long userId;
    private String name;
    private String provider;
    private Float entireWeight;
    private Float calories;
    private Float carbohydrate;
    private Float protein;
    private Float fat;
    private Float intake;
    private Float gl;
    private GLResult result;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

}
