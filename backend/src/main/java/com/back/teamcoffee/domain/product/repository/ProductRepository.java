package com.back.teamcoffee.domain.product.repository;

import com.back.teamcoffee.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
