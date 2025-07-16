package com.back.teamcoffee.domain.user.dto;

public record AuthTokensDto(
        String accessToken,
        String refreshToken
) {


}
