package com.diabetes.foodInfo;

import com.diabetes.common.exception.NoSuchElementFoundException;
import com.diabetes.foodInfo.dto.FoodDto;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
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

    @Transactional(readOnly = true)
    public List<FoodDto> getFoodList(Long userId) {
        List<Food> allFoodListByUserId = foodRepository.findAllByUserId(userId);

        List<FoodDto> dtoList = allFoodListByUserId.stream()
                .map(Food::toDto)
                .collect(Collectors.toList());

        return dtoList;
    }

    @Transactional(readOnly = true)
    public FoodDto getFoodInfo(Long foodId) {

        Optional<Food> foodInfo = foodRepository.findById(foodId);
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
    public Boolean updateFoodInfoDeleted(Long foodId) {
        //foodRepository.deleteById(foodId);
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
                //.user(userRepository.findById(dto.getUserId()))
                .provider(dto.getProvider())
                .entireWeight(dto.getEntireWeight())
                .fat(dto.getFat())
                .carbohydrate(dto.getCarbohydrate())
                .calories(dto.getCalories())
                .protein(dto.getProtein())
                .intake(dto.getIntake())
                .remains(dto.getRemains())
                .gl(dto.getGl())
                .result(dto.getResult())
                .build();
    }
}

