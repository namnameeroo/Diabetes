package com.diabetes.food;

import com.diabetes.common.dto.CommonResponse;
import com.diabetes.common.dto.CustomPageDto;
import com.diabetes.food.dto.FoodReqDto;
import com.diabetes.food.dto.FoodResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin")
public class AdminFoodController {

    private final FoodService foodService;

    /**
     * 유저 정보 기준 등록했던 음식 리스트 조회
     */
    @GetMapping("/foods")
    public ResponseEntity<?> getFoodList(Authentication authentication,
                                         @RequestParam(name="userId") Long userId,
                                         @PageableDefault(sort="modifiedDate", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<FoodResDto> foodList = foodService.getFoodList(userId, pageable);
        CustomPageDto customPageDto = new CustomPageDto(foodList);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESS", customPageDto));
    }

    /**
     * 특정 등록 음식 조회
     */
    @GetMapping("/foods/{foodId}")
    public ResponseEntity<?> getFoodDetailInfo(@PathVariable Long foodId, Authentication authentication) {

        FoodResDto foodDto = foodService.getFoodInfoByFoodId(foodId);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESS", foodDto));
    }

    /**
     * 음식 정보 삭제 (관리자 권한을 가진 경우)
     */
    @DeleteMapping("/foods/{foodId}")
    public ResponseEntity<?> deleteFoodInfo(@PathVariable Long foodId, Authentication authentication) {

        Boolean result = foodService.updateFoodInfoDeletedByFoodId(foodId);
        return ResponseEntity.ok(new CommonResponse<Long>("SUCCESSFULLY DELETED BY ID", foodId));
    }

    /**
     * 음식 정보 수정 (관리자 권한을 가진 경우)
     */
    @PutMapping("/foods/{foodId}")
    public ResponseEntity<?> updateFoodInfo(@PathVariable Long foodId, @RequestBody FoodReqDto dto, Authentication authentication) {

        FoodResDto foodDto = foodService.updateFoodInfo(foodId, dto.getUserId(), dto);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESSFULLY UPDATE", foodDto));
    }

    /**
     * 음식 정보 등
     */
    @PostMapping("/foods")
    public ResponseEntity<?> saveFoodInfo(@RequestBody FoodReqDto foodDto, Authentication authentication) {

        foodDto.checkUserIdNotNull(); // 흠...
        FoodResDto savedFoodDto = foodService.saveFoodInfo(foodDto);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath() //.fromContextPath(request) or .fromCurrentRequest()
                .path("/food/" + savedFoodDto.getId())
                .build()
                .toUri();

        return ResponseEntity.created(location)
                .body(new CommonResponse<>("SUCCESS", savedFoodDto));
    }
}
