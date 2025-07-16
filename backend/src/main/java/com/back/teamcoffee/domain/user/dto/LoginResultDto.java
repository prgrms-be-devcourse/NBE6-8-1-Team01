package com.back.teamcoffee.domain.user.dto;

public record LoginResultDto(
        UserLoginResponseDto user,
        AuthTokensDto token
) {
}
