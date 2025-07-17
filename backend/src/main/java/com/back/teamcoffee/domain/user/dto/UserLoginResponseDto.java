package com.back.teamcoffee.domain.user.dto;

import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import jakarta.validation.constraints.Email;

public record UserLoginResponseDto(

        @Email String email,
        String name,
        UserRole role
) {

    public UserLoginResponseDto( String email, String name, UserRole role) {

        this.email = email;
        this.name = name;
        this.role = role;
    }
    public static UserLoginResponseDto from(User user) {
        return new UserLoginResponseDto(
                user.getEmail(),
                user.getName(),
                user.getRole()
        );
    }

}
