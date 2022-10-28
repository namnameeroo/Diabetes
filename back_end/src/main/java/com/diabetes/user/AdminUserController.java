package com.diabetes.user;

import com.diabetes.auth.security.UserPrincipal;
import com.diabetes.common.dto.CommonResponse;
import com.diabetes.user.domain.RoleType;
import com.diabetes.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collection;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin")
public class AdminUserController {

    private final UserService userService;

    @GetMapping("/users")
    public CommonResponse<List<UserResponseDto>> getUserListForAdmin(Principal principal, @AuthenticationPrincipal UserPrincipal userPrincipal) {

        List<UserResponseDto> userResponseDtoList = userService.findAllUsers();
        return new CommonResponse<>("UserList For Admin", userResponseDtoList);
    }

}
