package com.diabetes.foodInfo;

import com.diabetes.auth.security.UserPrincipal;
import com.diabetes.common.dto.CommonResponse;
import com.diabetes.foodInfo.dto.FoodDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
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
        List<FoodDto> foodList = foodService.getFoodList(userPrincipal.getId());
        return ResponseEntity.ok(new CommonResponse<>("", foodList));
    }

    /**
     * 특정 등록 음식 조회
     */
    @GetMapping("/food/{foodId}")
    public ResponseEntity<?> getFoodDetailInfo(@PathVariable Long foodId) {
        FoodDto foodDto = foodService.getFoodInfo(foodId);
        return ResponseEntity.ok(new CommonResponse<FoodDto>("", foodDto));
    }

    /**
     * 음식 정보 등록
     */
    @PostMapping("/food")
    public ResponseEntity<?> saveFoodInfo(@RequestBody FoodDto foodDto) {
        FoodDto savedFoodDto = foodService.saveFoodInfo(foodDto);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath() //.fromContextPath(request)
                .path("/food/" + savedFoodDto.getId())
                .build()
                .toUri();

        return ResponseEntity.created(location)
                .body(savedFoodDto);
    }

    /**
     * 음식 정보 삭제
     */
    @DeleteMapping("/food/{foodId}")
    public ResponseEntity<?> deleteFoodInfo(@PathVariable Long foodId) {
        Boolean result = foodService.updateFoodInfoDeleted(foodId);
        return ResponseEntity.ok(new CommonResponse<Long>("SUCCESSFULLY DELETED BY ID", foodId));
    }

    /**
     * 음식 정보 수정
     */
    @PutMapping("/food/{foodId}")
    public ResponseEntity<?> updateFoodInfo(@PathVariable Long foodId, @RequestBody FoodDto dto) {
        if (!foodId.equals(dto.getId())) throw new IllegalStateException("NOT VALID INPUT");

        FoodDto foodDto = foodService.updateFoodInfo(foodId, dto);
        return ResponseEntity.ok(new CommonResponse<FoodDto>("SUCCESSFULLY UPDATE", foodDto));
    }

}
