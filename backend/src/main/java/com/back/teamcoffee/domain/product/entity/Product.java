package com.back.teamcoffee.domain.product.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name", nullable = false, length = 100)
    private String productName;

    private int price;

    @Column(length = 100)
    private String description;

    @Column(name = "order_count")
    private int orderCount;

    @Column(name = "product_image", columnDefinition = "TEXT")
    private String productImage;

    private int stock;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public Product(String productName, int price, String description, int orderCount, String productImage, int stock, LocalDateTime createdAt) {
        this.productName = productName;
        this.price = price;
        this.description = description;
        this.orderCount = orderCount;
        this.productImage = productImage;
        this.stock = stock;
        this.createdAt = createdAt;
    }
}
