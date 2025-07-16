package com.back.teamcoffee.domain.product.service;

import com.back.teamcoffee.domain.product.dto.ProductDto;
import com.back.teamcoffee.domain.product.entity.Product;
import com.back.teamcoffee.domain.product.repository.ProductRepository;
import com.back.teamcoffee.global.exception.DataNotFoundException;
import com.back.teamcoffee.global.rsdata.RsData;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    public RsData<List<ProductDto>> getProductList() {
        List<Product> products = productRepository.findAll();

        List<ProductDto> dtoList = products.stream()
                .map(ProductDto::new)
                .toList();

        return RsData.of("200-OK", "상품 조회 성공", dtoList);
    }

    public RsData<Void> deleteProduct(Long id) {
        Optional<Product> productOpt = productRepository.findById(id);

        if (productOpt.isEmpty()) {
            throw new DataNotFoundException("존재하지 않는 상품입니다.");
        }

        productRepository.deleteById(id);
        return RsData.of("200-OK", "상품 삭제 성공");
    }
}
