package com.back.teamcoffee.domain.user.dto;

public record LoginResultDto(
        UserLoginResponseDto user,
        AuthTokensDto token
) {

    public static LoginResultDto of(UserLoginResponseDto user, AuthTokensDto token) {
        return new LoginResultDto(user, token);
    }

    public static LoginResultDto from(UserLoginResponseDto user, AuthTokensDto token) {
        return new LoginResultDto(user, token);
    }

}
