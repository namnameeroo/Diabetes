package com.diabetes.food;


import com.diabetes.user.domain.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findAllByUser(User user);
    List<Food> findAllByUserId(Long userId, PageRequest pageRequest);

    Optional<Food> findByIdAndUserId(Long foodId, Long userId);
}
