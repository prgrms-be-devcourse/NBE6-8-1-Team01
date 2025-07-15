package com.back.teamcoffee.domain.user.dto;

import jakarta.validation.constraints.NotBlank;

public record UserLoginRequestDto(
        @NotBlank(message = "사용자 이름은 필수입니다") String username,
        @NotBlank(message = "이메일은 필수입니다") String email,
        @NotBlank(message = "비밀번호는 필수입니다.") String password
) {
}
