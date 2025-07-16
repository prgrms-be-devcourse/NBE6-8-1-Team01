package com.back.teamcoffee.domain.user.dto;

import com.back.teamcoffee.domain.user.entity.UserRole;
import jakarta.validation.constraints.Email;

public record UserLoginResponseDto(
        int id,
        @Email String email,
        String name,
        UserRole role
) {

    public UserLoginResponseDto(int id, String email, String name, UserRole role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public static UserLoginResponseDto from(UserDto userDto) {
        return new UserLoginResponseDto(
                userDto.id(),
                userDto.email(),
                userDto.name(),
                userDto.role()
        );
    }

}
