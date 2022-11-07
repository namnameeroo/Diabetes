package com.diabetes.user;

import com.diabetes.auth.security.UserPrincipal;
import com.diabetes.common.dto.CommonResponse;
import com.diabetes.user.domain.RoleType;
import com.diabetes.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/admin")
public class AdminUserController {
    private final UserService userService;

    // TODO 필터링
    // TODO 응답값으로 Page를 쓸 것인가....
    @GetMapping("/users")
    public CommonResponse<Page<UserResponseDto>> getUserListForAdmin(@PageableDefault(sort="modifiedDate", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<UserResponseDto> userResponseDtoList = userService.findAllUsers(pageable);
        return new CommonResponse<>("UserList For Admin", userResponseDtoList);
    }

    @GetMapping("/users/{userId}")
    public CommonResponse<UserResponseDto> getUserByUserIdForAdmin(@PathVariable("userId")Long userId) {

        UserResponseDto userResponseDto = userService.findUserById(userId);
        return new CommonResponse<>("UserDto For Admin", userResponseDto);
    }
}
