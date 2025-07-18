package com.back.teamcoffee.domain.user.dto;

import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import jakarta.validation.constraints.Email;

public record UserLoginResponseDto(

        @Email String email,
        String name,
        UserRole role,
        String address
) {

    public UserLoginResponseDto( String email, String name, UserRole role, String address) {

        this.email = email;
        this.name = name;
        this.role = role;
        this.address = address;
    }
    public static UserLoginResponseDto from(User user) {
        return new UserLoginResponseDto(
                user.getEmail(),
                user.getName(),
                user.getRole(),
                user.getAddress()
        );
    }

}
