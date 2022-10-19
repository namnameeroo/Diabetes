package com.diabetes.foodInfo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FoodDto {

    private Long id;
    private Long userId;
    private String name;
    private String provider;
    private Integer entireWeight;
    private Integer calories;
    private Integer carbohydrate;
    private Integer protein;
    private Integer fat;
    private Integer intake;
    private Integer remains;
    private Integer gl;
    private String result;

}
