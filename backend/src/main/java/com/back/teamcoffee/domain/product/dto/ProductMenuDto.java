package com.back.teamcoffee.domain.product.dto;

import com.back.teamcoffee.domain.product.entity.Product;

public record ProductMenuDto(
        Long productId,
        String productName,
        int price,
        String description,
        String imgUrl
) {
    public static ProductMenuDto from(Product product) {
        return new ProductMenuDto(
                product.getProductId(),
                product.getProductName(),
                product.getPrice(),
                product.getDescription(),
                product.getProductImage()
        );
    }
}
