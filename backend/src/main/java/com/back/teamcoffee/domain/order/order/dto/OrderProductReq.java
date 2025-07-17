package com.back.teamcoffee.domain.order.order.dto;

import jakarta.validation.constraints.NotBlank;

public record OrderProductReq(
    @NotBlank
    String productId,
    int productCount
) {}