package com.back.teamcoffee.domain.product.dto;

import java.time.LocalDateTime;

public record ProductDto(
        Long productId,
        String productName,
        int price,
        String description,
        int orderCount,
        String productImage,
        int stock,
        LocalDateTime createdAt
) {}
