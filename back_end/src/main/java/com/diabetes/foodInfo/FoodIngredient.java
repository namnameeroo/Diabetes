package com.diabetes.foodInfo;

import com.diabetes.user.User;
import javax.persistence.*;

@Entity
public class FoodIngredient {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private User user;
}
