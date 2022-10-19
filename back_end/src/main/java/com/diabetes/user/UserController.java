package com.diabetes.user;

import com.diabetes.common.dto.CommonResponse;
import com.diabetes.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    @GetMapping("/users/me")
    public CommonResponse<UserDto> getCurrentUserInfo(Principal principal) {
        UserDto userDto = userService.findUserByEmail(principal.getName());
        return new CommonResponse<>("User Info getting by UserEmail", userDto);
    }
}
