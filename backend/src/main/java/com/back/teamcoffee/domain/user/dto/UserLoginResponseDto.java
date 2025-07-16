package com.back.teamcoffee.domain.user.dto;

import com.back.teamcoffee.domain.user.entity.UserRole;

public record UserLoginResponseDto(
        int id,
        String email,
        String name,
        UserRole role
) {


}
