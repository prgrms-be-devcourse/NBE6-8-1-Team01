package com.back.teamcoffee.domain.user.dto;

public record AuthTokensDto(
        String accessToken,
        String refreshToken
) {

    public static AuthTokensDto of(String accessToken, String refreshToken) {
        return new AuthTokensDto(accessToken, refreshToken);
    }

}
