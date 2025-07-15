package com.back.teamcoffee.domain.product.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public record ProductDto(
        Long productId,
        @NotBlank(message = "상품명은 필수입니다")
        String productName,
        int price,
        String description,
        int orderCount,
        String productImage,
        int stock,
        LocalDateTime createdAt
) {}
