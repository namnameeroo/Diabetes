package com.diabetes.food.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FoodSimpleResDto {
    private Long id;
    private Long userId;
    private String name;
    private String provider;
    private Integer entireWeight;
    private Integer calories;
}
