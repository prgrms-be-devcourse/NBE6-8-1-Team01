package com.back.teamcoffee.domain.wishlist.dto;

import jakarta.validation.constraints.Min;

public record WishListCreateDto(
    @Min(value = 1, message = "상품 ID는 1 이상이어야 합니다.")
    long productId,
    @Min(value = 1, message = "수량은 1 이상이어야 합니다.")
    int quantity
) {}
