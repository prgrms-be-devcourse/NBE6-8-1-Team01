package com.back.teamcoffee.domain.product.controller;

import com.back.teamcoffee.domain.product.dto.ProductDto;
import com.back.teamcoffee.domain.product.service.ProductService;
import com.back.teamcoffee.global.rsdata.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    // 새 상품 등록
    @PostMapping
    public ResponseEntity<RsData<ProductDto>> createProduct(@Valid @RequestBody ProductDto productDto) {
        RsData<ProductDto> createdProduct = productService.createProduct(productDto);
        return ResponseEntity.status(201).body(createdProduct);
    }

    // 상품 조회
    @GetMapping
    public ResponseEntity<RsData<List<ProductDto>>> getProductList() {
        RsData<List<ProductDto>> productList = productService.getProductList();
        return ResponseEntity.ok(productList);
    }

    // 상품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<RsData<Void>> deleteProduct(@PathVariable Long id) {
        RsData<Void> response = productService.deleteProduct(id);
        return ResponseEntity.ok(response);
    }
}
