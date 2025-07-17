package com.back.teamcoffee.domain.user.dto;

import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegisterRequestDto(
        @NotBlank(message = "사용자 이름은 필수입니다")
        String username,
        @NotBlank(message = "이메일은 필수입니다")
        @Email
        String email,
        @NotBlank(message = "비밀번호는 필수입니다.")
        @Size(min = 4, message = "비밀번호는 4자 이상이어야 합니다.")
        String password,
        @NotBlank(message = "주소는 필수입니다")
        String address,

        UserRole role
) {

    public UserRegisterRequestDto(String username, String email, String password,String address, UserRole role) {

        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.role = role;
    }

      public static UserRegisterRequestDto from(User user) {

        return new UserRegisterRequestDto(

                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getAddress(),
                user.getRole()
        );
    }

}
