package com.diabetes.food;

import com.diabetes.common.exception.NoSuchElementFoundException;
import com.diabetes.food.dto.FoodDto;
import com.diabetes.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class FoodService {

    private final FoodRepository foodRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<FoodDto> getFoodList(Long userId, PageRequest pageRequest) {
        List<Food> allFoodListByUserId = foodRepository.findAllByUserId(userId, pageRequest);

        List<FoodDto> dtoList = allFoodListByUserId.stream()
                .map(Food::toDto)
                .collect(Collectors.toList());

        return dtoList;
    }

    @Transactional(readOnly = true)
    public FoodDto getFoodInfoByFoodId(Long foodId) {

        Optional<Food> foodInfo = foodRepository.findById(foodId);
        FoodDto foodDto = foodInfo.orElseThrow(
                        ()-> new NoSuchElementFoundException("NOT FOUND ITEM", HttpStatus.NOT_FOUND)
                )
                .toDto();
        return foodDto;
    }

    @Transactional(readOnly = true)
    public FoodDto getFoodInfo(Long foodId, Long userId) {

        Optional<Food> foodInfo = foodRepository.findByIdAndUserId(foodId, userId);
        FoodDto foodDto = foodInfo.orElseThrow(
                        ()-> new NoSuchElementFoundException("NOT FOUND ITEM", HttpStatus.NOT_FOUND)
                )
                .toDto();
        return foodDto;
    }

    @Transactional
    public FoodDto saveFoodInfo(FoodDto foodDto) {
        Food savedFood = foodRepository.save(convertToEntity(foodDto));
        return savedFood.toDto();
    }

    @Transactional
    public FoodDto updateFoodInfo(Long foodId, FoodDto dto) {
        Optional<Food> foodInfoById = foodRepository.findById(foodId);
        FoodDto foodDto = foodInfoById.orElseThrow(
                        ()-> new NoSuchElementFoundException("NOT FOUND ITEM", HttpStatus.NOT_FOUND)
                )
                .modify(dto)
                .toDto();
        return foodDto;
    }

    /**
     * 데이터의 상태를 변경해서 삭제 처리?
     */
    @Transactional
    public Boolean updateFoodInfoDeleted(Long foodId, Long userId) {
        Optional<Food> foodInfoById = foodRepository.findByIdAndUserId(foodId, userId);
        FoodDto foodDto = foodInfoById.orElseThrow(
                ()-> new NoSuchElementFoundException("NOT FOUND ITEM", HttpStatus.NOT_FOUND)
        )
                .setDeleted()
                .toDto();

        // 익셉션이 없다면, 삭제되었을 것
        return Boolean.TRUE;
    }

    @Transactional
    public Boolean updateFoodInfoDeletedByFoodId(Long foodId) {

        Optional<Food> foodInfoById = foodRepository.findById(foodId);
        FoodDto foodDto = foodInfoById.orElseThrow(
                        ()-> new NoSuchElementFoundException("NOT FOUND ITEM", HttpStatus.NOT_FOUND)
                )
                .setDeleted()
                .toDto();

        // 익셉션이 없다면, 삭제되었을 것
        return Boolean.TRUE;
    }

    @Transactional
    public Boolean deleteFoodInfo(Long foodId) {
        foodRepository.deleteById(foodId);
        // 익셉션이 없다면, 삭제되었을 것
        return Boolean.TRUE;
    }

    private Food convertToEntity(FoodDto dto) {
        return Food.builder()
                .id(dto.getId())
                .name(dto.getName())
                .user(userRepository.findById(dto.getUserId()).orElseThrow(
                        () -> new NoSuchElementFoundException("NOT VALID USER ID")
                ))
                .provider(dto.getProvider())
                .entireWeight(dto.getEntireWeight())
                .fat(dto.getFat())
                .carbohydrate(dto.getCarbohydrate())
                .calories(dto.getCalories())
                .protein(dto.getProtein())
                .intake(dto.getIntake())
                .gl(dto.getGl())
                .result(dto.getResult())//Enum.valueOf(GLResult.class, dto.getResult()))
                .build();
    }


}

