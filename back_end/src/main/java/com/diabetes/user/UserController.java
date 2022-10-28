package com.diabetes.user;

import com.diabetes.auth.security.UserPrincipal;
import com.diabetes.common.dto.CommonResponse;
import com.diabetes.user.dto.UserRequestDto;
import com.diabetes.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("/users/me")
    public CommonResponse<UserResponseDto> getCurrentUserInfo(Principal principal, @AuthenticationPrincipal UserPrincipal userPrincipal) {

        UserResponseDto userResponseDto = userService.findUserById(userPrincipal.getId()); //findUserByAuthId(principal.getName());
        return new CommonResponse<>("User Info getting by UserEmail", userResponseDto);
    }

    @PutMapping("/users/me")
    public CommonResponse<UserResponseDto> modifyCurrentUserInfo(@RequestBody UserRequestDto requestDto, @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long userId = userPrincipal.getId();
//        requestDto.checkUserId(userPrincipal.getId());

        UserResponseDto userResponseDto = userService.updateUserInfo(userId, requestDto); //findUserByAuthId(principal.getName());
        return new CommonResponse<>("User Info getting by UserEmail", userResponseDto);
    }


}
