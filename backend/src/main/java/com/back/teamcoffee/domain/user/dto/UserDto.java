package com.back.teamcoffee.domain.user.dto;

import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserDto(
        int id,
        @NotBlank
        String name,
        @NotBlank
        @Email
        String email,

        UserRole role
) {

    public UserDto(int id, String name, String email, UserRole role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

      public static UserDto from(User user) {

        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

}
