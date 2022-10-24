package com.diabetes.food;


import com.diabetes.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findAllByUser(User user);
    List<Food> findAllByUserId(Long userId);
}
