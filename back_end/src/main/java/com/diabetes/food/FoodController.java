package com.diabetes.food;

import com.diabetes.auth.security.UserPrincipal;
import com.diabetes.common.dto.CommonResponse;
import com.diabetes.food.dto.FoodDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class FoodController {

    private final FoodService foodService;

    /**
     * 유저 정보 기준 등록했던 음식 리스트 조회
     */
    @GetMapping("/foods")
    public ResponseEntity<?> getFoodList(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();
        List<FoodDto> foodList = foodService.getFoodList(userId);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESS", foodList));
    }

    /**
     * 특정 등록 음식 조회
     */
    @GetMapping("/foods/{foodId}")
    public ResponseEntity<?> getFoodDetailInfo(@PathVariable Long foodId, Authentication authentication) {

//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        FoodDto foodDto = foodService.getFoodInfo(foodId, userPrincipal.getId());
        FoodDto foodDto = foodService.getFoodInfoByFoodId(foodId);

        return ResponseEntity.ok(new CommonResponse<>("SUCCESS", foodDto));
    }

    /**
     * 음식 정보 등록
     */
    @PostMapping("/foods")
    public ResponseEntity<?> saveFoodInfo(@RequestBody FoodDto foodDto, Authentication authentication) {

//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        foodDto.checkUserId(userPrincipal.getId());

        FoodDto savedFoodDto = foodService.saveFoodInfo(foodDto);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath() //.fromContextPath(request)
                .path("/food/" + savedFoodDto.getId())
                .build()
                .toUri();

        return ResponseEntity.created(location)
                .body(new CommonResponse<>("SUCCESS", savedFoodDto));
    }

    /**
     * 음식 정보 삭제
     */
    @DeleteMapping("/foods/{foodId}")
    public ResponseEntity<?> deleteFoodInfo(@PathVariable Long foodId, Authentication authentication) {

//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Boolean result = foodService.updateFoodInfoDeletedByFoodId(foodId);
        // Boolean result = foodService.updateFoodInfoDeleted(foodId, userPrincipal.getId());
        return ResponseEntity.ok(new CommonResponse<Long>("SUCCESSFULLY DELETED BY ID", foodId));
    }

    /**
     * 음식 정보 수정
     */
    @PutMapping("/foods/{foodId}")
    public ResponseEntity<?> updateFoodInfo(@PathVariable Long foodId, @RequestBody FoodDto dto, Authentication authentication) {
        if (!foodId.equals(dto.getId())) throw new IllegalStateException("NOT VALID INPUT");

//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        dto.checkUserId(userPrincipal.getId());

        FoodDto foodDto = foodService.updateFoodInfo(foodId, dto);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESSFULLY UPDATE", foodDto));
    }

}
