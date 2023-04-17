package com.diabetes.user;

import com.diabetes.common.dto.CommonResponse;
import com.diabetes.common.dto.CustomPageDto;
import com.diabetes.user.dto.AdminSecretDto;
import com.diabetes.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin")
public class AdminUserController {
    private final UserService userService;

    @Value("${admin.secret}")
    private String adminSecret;

    @GetMapping("/users")
    public CommonResponse<CustomPageDto> getUserListForAdmin(@PageableDefault(sort="modifiedDate", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<UserResponseDto> userPagingList = userService.findAllUsersWithFoodListCount(pageable);
        CustomPageDto customPageDto = new CustomPageDto(userPagingList);

        return new CommonResponse<>("UserList For Admin", customPageDto);
    }

    @GetMapping("/users/{userId}")
    public CommonResponse<UserResponseDto> getUserByUserIdForAdmin(@PathVariable("userId") Long userId) {

        UserResponseDto userResponseDto = userService.findUserById(userId);
        return new CommonResponse<>("UserDto For Admin", userResponseDto);
    }

    @PutMapping("users/{userId}/admin-role")
    public CommonResponse<UserResponseDto> addUserRoleAdmin(@PathVariable("userId") Long userId, @RequestBody AdminSecretDto dto) {

        Assert.isTrue(this.adminSecret.equals(dto.getAdminSecret()), "NOT CORRECT Admin Secret");

        UserResponseDto userResponseDto = userService.addAdminRoleToUser(userId);
        return new CommonResponse<>("Successfully Added Admin Role", userResponseDto);
    }
}
