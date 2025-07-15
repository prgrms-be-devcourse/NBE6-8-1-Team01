package com.back.teamcoffee.domain.product.controller;

import com.back.teamcoffee.domain.product.dto.ProductDto;
import com.back.teamcoffee.domain.product.service.ProductService;
import com.back.teamcoffee.global.rsdata.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<RsData<ProductDto>> createProduct(@RequestBody ProductDto productDto) {
        RsData<ProductDto> createdProduct = productService.createProduct(productDto);
        return ResponseEntity.status(201).body(createdProduct);
    }
}
