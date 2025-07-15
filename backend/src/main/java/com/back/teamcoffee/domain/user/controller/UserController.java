package com.back.teamcoffee.domain.user.controller;


import com.back.teamcoffee.global.rsdata.RsData;
import com.back.teamcoffee.domain.user.dto.UserDto;
import com.back.teamcoffee.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{email}/list")
    public ResponseEntity<RsData<UserDto>> getUserList(@Valid @PathVariable String email) {
        RsData<UserDto> userList = userService.getUserList(email);
        return ResponseEntity.ok(
                userList
        );

    }
    @GetMapping("/{email}/wish_list")
    public ResponseEntity<RsData<UserDto>> getUserWishList(@Valid @PathVariable String email) {
        RsData<UserDto> userWishList = userService.getUserWishList(email);
        return ResponseEntity.ok(
                userWishList
        );
    }

}
