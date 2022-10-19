package com.diabetes.foodInfo;

import com.diabetes.common.domain.BaseTimeEntity;
import com.diabetes.foodInfo.dto.FoodDto;
import com.diabetes.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Food extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private User user;

    private String name;
    private String provider;
    private Integer entireWeight;
    private Integer calories;
    private Integer carbohydrate;
    private Integer protein;
    private Integer fat;
    private Integer intake;
    private Integer remains;
    private Integer gl; // 소숫점
    private String result; // low, middle, high


    public FoodDto toDto() {
        return FoodDto.builder()
                .id(this.id)
                //.userId()
                .name(this.name)
                .provider(this.provider)
                .entireWeight(this.entireWeight)
                .calories(this.calories)
                .carbohydrate(this.carbohydrate)
                .protein(this.protein)
                .fat(this.fat)
                .intake(this.intake)
                .remains(this.remains)
                .gl(this.gl)
                .result(this.result)
                .build();
    }

    public Food modify(FoodDto dto) {
//        this.id = dto.getId();
//        this.name = dto.getName();
//        this.provider = dto.getProvider();
        this.entireWeight = dto.getEntireWeight();
        this.calories = dto.getCalories();
        this.carbohydrate = dto.getCarbohydrate();
        this.protein = dto.getProtein();
        this.fat = dto.getFat();
        this.intake = dto.getIntake();
        this.remains = dto.getRemains();
        this.gl = dto.getGl();
        this.result = dto.getResult();

        return this;
    }
}
