package com.back.teamcoffee.domain.product.dto;

import com.back.teamcoffee.domain.product.entity.Product;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record ProductDto(
        Long productId,

        @NotBlank(message = "상품명은 필수입니다")
        @Size(min = 2, max = 100, message = "상품명은 2자 이상 100자 이하여야 합니다")
        String productName,

        @Min(value = 0, message = "가격은 0원 이상이어야 합니다")
        int price,

        @Size(max = 1000, message = "상품 설명은 1000자 이하여야 합니다")
        String description,

        @Min(value = 0, message = "주문 수량은 0 이상이어야 합니다")
        int orderCount,
        String productImage,

        @Min(value = 0, message = "재고는 0 이상이어야 합니다")
        int stock,
        LocalDateTime createdAt
) {
        public static ProductDto from(Product product) {
                return new ProductDto(
                        product.getProductId(),
                        product.getProductName(),
                        product.getPrice(),
                        product.getDescription(),
                        product.getOrderCount(),
                        product.getProductImage(),
                        product.getStock(),
                        product.getCreatedAt()
                );
        }
}
