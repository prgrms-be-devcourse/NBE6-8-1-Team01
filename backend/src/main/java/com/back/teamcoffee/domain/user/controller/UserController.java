package com.back.teamcoffee.domain.user.controller;


import com.back.teamcoffee.domain.user.dto.LoginResultDto;
import com.back.teamcoffee.domain.user.dto.UserLoginRequestDto;
import com.back.teamcoffee.domain.user.dto.UserRegisterRequestDto;
import com.back.teamcoffee.domain.user.service.UserService;
import com.back.teamcoffee.global.rsdata.RsData;
import com.back.teamcoffee.global.security.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<RsData<LoginResultDto>> register(
            @Valid @RequestBody UserRegisterRequestDto userRegisterRequestDto,
            HttpServletResponse response
            ) {
        RsData<LoginResultDto> body = userService.register(userRegisterRequestDto);
        if(body.data() != null) {
            CookieUtil.addTokenCookies(body.data().token(),  response);
        }
        return ResponseEntity
                .status(body.statusCode())
                .body(body);
    }

    @PostMapping("/login")
    public ResponseEntity<RsData<LoginResultDto>> login(
            @Valid @RequestBody UserLoginRequestDto userLoginRequestDto,
            HttpServletResponse response
    ) {
        RsData<LoginResultDto> body = userService.login(userLoginRequestDto);
        if(body.data() != null) {
            CookieUtil.addTokenCookies(body.data().token(), response);
        }
        return ResponseEntity
                .status(body.statusCode())
                .body(body);
    }

    @PostMapping("/logout")
    public ResponseEntity<RsData<Void>> logout(HttpServletResponse response) {
        CookieUtil.deleteTokenCookies(response);
        return ResponseEntity.ok(RsData.of("200-LOGOUT", "로그아웃 되었습니다.", null));
    }


    @DeleteMapping
    public ResponseEntity<RsData<Void>> deleteUser(
            @Email @RequestParam String email
    ) {
        userService.deleteuser(email);
        return ResponseEntity.ok(RsData.of("200-DELETED", "회원 탈퇴가 완료되었습니다.", null));
    }



}
