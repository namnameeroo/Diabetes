package com.diabetes.food;

import com.diabetes.auth.security.UserPrincipal;
import com.diabetes.common.dto.CommonResponse;
import com.diabetes.food.dto.FoodDto;
import com.diabetes.user.domain.RoleType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collection;
import java.util.List;

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
    public ResponseEntity<?> getFoodList(@RequestParam(name="user") Long userId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();
        boolean check = authorities
                .stream()
                .anyMatch(item -> RoleType.ADMIN.getCode().equals(item.getAuthority()));

        if (!check) throw new AccessDeniedException("NOT ALLOWED");

        List<FoodDto> foodList = foodService.getFoodList(userId);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESS", foodList));
    }

    /**
     * 특정 등록 음식 조회
     */
    @GetMapping("/foods/{foodId}")
    public ResponseEntity<?> getFoodDetailInfo(@PathVariable Long foodId, Authentication authentication) {

        // 어드민 확인 로직, 이중으로 확인하는 것이나, 모듈별 분리를 고려하면 필요할 가능성이 있음
        // 다만 코드 중복 제거를 위한 리팩토링이 필요함
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();
        boolean check = authorities
                .stream()
                .anyMatch(item -> RoleType.ADMIN.getCode().equals(item.getAuthority()));
        if (!check) throw new AccessDeniedException("NOT ALLOWED");

        FoodDto foodDto = foodService.getFoodInfoByFoodId(foodId);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESS", foodDto));
    }

    /**
     * 음식 정보 등록
     */
    @PostMapping("/foods")
    public ResponseEntity<?> saveFoodInfo(@RequestBody FoodDto foodDto, Authentication authentication) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();
        boolean check = authorities
                .stream()
                .anyMatch(item -> RoleType.ADMIN.getCode().equals(item.getAuthority()));

        if (!check) throw new AccessDeniedException("NOT ALLOWED");

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

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();
        boolean check = authorities
                .stream()
                .anyMatch(item -> RoleType.ADMIN.getCode().equals(item.getAuthority()));

        if (!check) throw new AccessDeniedException("NOT ALLOWED");

        Boolean result = foodService.updateFoodInfoDeletedByFoodId(foodId);
        return ResponseEntity.ok(new CommonResponse<Long>("SUCCESSFULLY DELETED BY ID", foodId));
    }

    /**
     * 음식 정보 수정
     */
    @PutMapping("/foods/{foodId}")
    public ResponseEntity<?> updateFoodInfo(@PathVariable Long foodId, @RequestBody FoodDto dto, Authentication authentication) {

        // dto에 입력된 item의 id와 url에 입려된 id 같은지 검증...ㅎ
        if (!foodId.equals(dto.getId())) throw new IllegalStateException("NOT VALID INPUT");

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> authorities = userPrincipal.getAuthorities();
        boolean check = authorities
                .stream()
                .anyMatch(item -> RoleType.ADMIN.getCode().equals(item.getAuthority()));

        if (!check) throw new AccessDeniedException("NOT ALLOWED");


        FoodDto foodDto = foodService.updateFoodInfo(foodId, dto);
        return ResponseEntity.ok(new CommonResponse<>("SUCCESSFULLY UPDATE", foodDto));
    }
}
