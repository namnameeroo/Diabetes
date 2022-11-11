package com.diabetes.user;

import com.diabetes.common.dto.CommonResponse;
import com.diabetes.common.dto.CustomPageDto;
import com.diabetes.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin")
public class AdminUserController {
    private final UserService userService;

    // TODO 필터링
    @GetMapping("/users")
    public CommonResponse<CustomPageDto> getUserListForAdmin(@PageableDefault(sort="modifiedDate", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<UserResponseDto> userPagingList = userService.findAllUsersWithFoodListCount(pageable);
        CustomPageDto customPageDto = new CustomPageDto(userPagingList);

        return new CommonResponse<>("UserList For Admin", customPageDto);
    }

    @GetMapping("/users/{userId}")
    public CommonResponse<UserResponseDto> getUserByUserIdForAdmin(@PathVariable("userId")Long userId) {

        UserResponseDto userResponseDto = userService.findUserById(userId);
        return new CommonResponse<>("UserDto For Admin", userResponseDto);
    }
}
