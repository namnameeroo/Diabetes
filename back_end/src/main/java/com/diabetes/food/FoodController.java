package com.diabetes.food;

import com.diabetes.auth.security.UserPrincipal;
import com.diabetes.common.dto.CommonResponse;
import com.diabetes.common.dto.CustomPageDto;
import com.diabetes.food.dto.FoodReqDto;
import com.diabetes.food.dto.FoodResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<?> getFoodList(Authentication authentication,
                                         @PageableDefault(sort="modifiedDate", direction = Sort.Direction.DESC) Pageable pageable) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Long userId = userPrincipal.getId();
        Page<FoodResDto> foodList = foodService.getFoodList(userId, pageable);
        CustomPageDto customPageDto = new CustomPageDto(foodList);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESS", customPageDto));
    }

    /**
     * 특정 등록 음식 조회
     */
    @GetMapping("/foods/{foodId}")
    public ResponseEntity<?> getFoodDetailInfo(@PathVariable Long foodId, Authentication authentication) {

//        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        FoodDto foodDto = foodService.getFoodInfo(foodId, userPrincipal.getId());
        FoodResDto foodDto = foodService.getFoodInfoByFoodId(foodId);

        return ResponseEntity.ok(new CommonResponse<>("SUCCESS", foodDto));
    }

    /**
     * 음식 정보 등록
     */
    @PostMapping("/foods")
    public ResponseEntity<?> saveFoodInfo(@RequestBody FoodReqDto foodDto, Authentication authentication) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//        foodDto.checkUserId(userPrincipal.getId());
        foodDto.assignUserId(userPrincipal.getId());
        FoodResDto savedFoodDto = foodService.saveFoodInfo(foodDto);

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

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        // Boolean result = foodService.updateFoodInfoDeletedByFoodId(foodId);
        Boolean result = foodService.updateFoodInfoDeleted(foodId, userPrincipal.getId());
        return ResponseEntity.ok(new CommonResponse<Long>("SUCCESSFULLY DELETED BY ID", foodId));
    }

    /**
     * 음식 정보 수정
     */
    @PutMapping("/foods/{foodId}")
    public ResponseEntity<?> updateFoodInfo(@PathVariable Long foodId, @RequestBody FoodReqDto dto, Authentication authentication) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        FoodResDto foodDto = foodService.updateFoodInfo(foodId, userPrincipal.getId(), dto);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESSFULLY UPDATE", foodDto));
    }

}
