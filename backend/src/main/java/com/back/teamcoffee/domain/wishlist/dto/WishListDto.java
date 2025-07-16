package com.back.teamcoffee.domain.wishlist.dto;

public record WishListDto(
    long wishId,
    long productId,
    String productName,
    int productPrice,
    String email,
    int quantity
) {}
