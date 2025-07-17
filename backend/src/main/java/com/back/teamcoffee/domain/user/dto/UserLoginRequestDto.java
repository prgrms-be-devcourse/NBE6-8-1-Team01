package com.back.teamcoffee.domain.user.dto;

import com.back.teamcoffee.domain.user.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserLoginRequestDto(
        @NotBlank(message = "사용자 이름은 필수입니다") String username,
        @NotBlank(message = "이메일은 필수입니다") @Email String email,
        @NotBlank(message = "비밀번호는 필수입니다.")@Size(min = 4, message = "비밀번호는 4자 이상이어야 합니다.") String password,
        UserRole role
) {}
