package com.back.teamcoffee.domain.product.service;

import com.back.teamcoffee.domain.product.dto.ProductDto;
import com.back.teamcoffee.domain.product.entity.Product;
import com.back.teamcoffee.domain.product.repository.ProductRepository;
import com.back.teamcoffee.global.rsdata.RsData;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public RsData<ProductDto> createProduct(ProductDto dto) {
        Product product = Product.builder()
                .productName(dto.productName())
                .price(dto.price())
                .description(dto.description())
                .orderCount(dto.orderCount())
                .productImage(dto.productImage())
                .stock(dto.stock())
                .createdAt(LocalDateTime.now())
                .build();

        Product saved = productRepository.save(product);

        ProductDto resultDto = new ProductDto(
                saved.getProductId(),
                saved.getProductName(),
                saved.getPrice(),
                saved.getDescription(),
                saved.getOrderCount(),
                saved.getProductImage(),
                saved.getStock(),
                saved.getCreatedAt()
        );

        return RsData.of("201-CREATED", "상품 등록 성공", resultDto);
    }
}
