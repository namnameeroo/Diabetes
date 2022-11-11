package com.diabetes.user;

import com.diabetes.user.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByAuthId(String authId);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByName(String name);

    @Query(value = "select u from User u left join fetch u.foodList", countQuery = "select count(u) from User u")
    Page<User> findAllWithFoodList(Pageable pageable);
}
