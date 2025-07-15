package com.back.teamcoffee.domain.product.controller;

import com.back.teamcoffee.domain.product.dto.ProductDto;
import com.back.teamcoffee.domain.product.entity.Product;
import com.back.teamcoffee.domain.product.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    @Test
    @DisplayName("상품 등록 성공 + DB 확인")
    void t1() throws Exception {

        ProductDto dto = new ProductDto(
                null,
                "Columbia Narino",
                5000,
                "커피콩",
                0,
                "img.png",
                30,
                LocalDateTime.now()
        );

        mvc.perform(post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.resultCode").value("201-CREATED"))
                .andExpect(jsonPath("$.msg").value("상품 등록 성공"))
                .andExpect(jsonPath("$.data.productName").value("Columbia Narino"));

        Optional<Product> saved = productRepository.findAll()
                .stream()
                .filter(p -> p.getProductName().equals("Columbia Narino"))
                .findFirst();

        assertThat(saved).isPresent();
        assertThat(saved.get().getPrice()).isEqualTo(5000);
    }

    @Test
    @DisplayName("상품 등록 실패 - 상품명 누락")
    void t2() throws Exception {

        ProductDto dto = new ProductDto(
                null,
                "",
                4500,
                "커피콩",
                0,
                "img.png",
                -5,
                LocalDateTime.now()
        );

        mvc.perform(post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").exists());
    }

    @Test
    @DisplayName("상품 등록 실패 - 재고가 음수일 경우")
    void t3() throws Exception {
        ProductDto dto = new ProductDto(
                null,
                "콜드브루",
                4000,
                "시원한 커피",
                0,
                "img.png",
                -5,
                LocalDateTime.now()
        );

        mvc.perform(post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").value("재고는 0 이상이어야 합니다"));
    }

    @Test
    @DisplayName("상품 등록 실패 - 상품명 너무 짧은 경우")
    void t4() throws Exception {
        ProductDto dto = new ProductDto(
                null,
                "A",
                3500,
                "간단한 설명",
                0,
                "img.png",
                20,
                LocalDateTime.now()
        );

        mvc.perform(post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").value("상품명은 2자 이상 100자 이하여야 합니다"));
    }

    @Test
    @DisplayName("상품 조회 성공")
    void t5() throws Exception {
        Product p1 = new Product("커피1", 4000, "커피콩", 0, "img.png", 10, LocalDateTime.now());
        Product p2 = new Product("커피2", 3000, "커피콩", 0, "img.png", 15, LocalDateTime.now());
        productRepository.save(p1);
        productRepository.save(p2);

        mvc.perform(get("/products"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-OK"))
                .andExpect(jsonPath("$.msg").value("상품 조회 성공"))
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].productName").value("커피1"))
                .andExpect(jsonPath("$.data[1].productName").value("커피2"));
    }

    @Test
    @DisplayName("전체 상품 조회 - 상품 없음")
    void t6() throws Exception {
        // 데이터 없이 테스트 -> 상품 저장 안 함

        mvc.perform(get("/products"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-OK"))
                .andExpect(jsonPath("$.msg").value("상품 조회 성공"))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(0));
    }
}
