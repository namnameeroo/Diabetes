package com.diabetes.food;

import com.diabetes.common.domain.BaseTimeEntity;
import com.diabetes.food.dto.FoodDto;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;
    private String name;
    private String provider;
    private Float entireWeight;
    private Float calories;
    private Float carbohydrate;
    private Float protein;
    private Float fat;
    private Float intake;
    private Float gl; // 소숫점
    private Food.GLResult result; // low, middle, high
    private Status status;


    public FoodDto toDto() {
        return FoodDto.builder()
                .id(this.id)
                //.userId() TODO 응답값에 유저 아이디 정보를 담아줘야 하는지???
                .name(this.name)
                .provider(this.provider)
                .entireWeight(this.entireWeight)
                .calories(this.calories)
                .carbohydrate(this.carbohydrate)
                .protein(this.protein)
                .fat(this.fat)
                .intake(this.intake)
                .gl(this.gl)
                .result(this.result.toString())
                .build();
    }

    public Food modify(FoodDto dto) {
//        this.id = dto.getId();
//        this.name = dto.getName();
//        this.provider = dto.getProvider();
        this.entireWeight = dto.getEntireWeight()==null ? this.entireWeight : dto.getEntireWeight();
        this.calories = dto.getCalories()==null ? this.calories : dto.getCalories();
        this.carbohydrate = dto.getCarbohydrate()==null ? this.carbohydrate : dto.getCarbohydrate();
        this.protein = dto.getProtein()==null ? this.protein : dto.getProtein();
        this.fat = dto.getFat()==null ? this.fat : dto.getFat();
        this.intake = dto.getIntake()==null ? this.intake : dto.getIntake();
        this.gl = dto.getGl()==null ? this.gl : dto.getGl();
        this.result = dto.getResult()==null ? this.result : Enum.valueOf(Food.GLResult.class, dto.getResult());

        return this;
    }

    public Food setDeleted() {
        this.status = Status.DELETED;
        return this;
    }

    public enum Status {
        NORMAL, DELETED, INVALID
    }
    public enum GLResult {
        LOW, MIDDLE, HIGH
    }
}
