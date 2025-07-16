package com.back.teamcoffee.domain.user.controller;


import com.back.teamcoffee.domain.user.dto.LoginResultDto;
import com.back.teamcoffee.domain.user.dto.UserLoginRequestDto;
import com.back.teamcoffee.domain.user.service.UserService;
import com.back.teamcoffee.global.rsdata.RsData;
import com.back.teamcoffee.global.security.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<RsData<LoginResultDto>> register(
            @Valid @RequestBody UserLoginRequestDto userLoginRequestDto,
            HttpServletResponse response
            ) {
        RsData<LoginResultDto> body = userService.register(userLoginRequestDto);
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




}
