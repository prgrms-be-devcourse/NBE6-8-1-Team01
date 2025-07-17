package com.back.teamcoffee.domain.order.order.controller;

import com.back.teamcoffee.domain.order.orderItem.repository.OrderItemRepository;
import com.back.teamcoffee.domain.product.entity.Product;
import com.back.teamcoffee.domain.product.repository.ProductRepository;
import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import com.back.teamcoffee.domain.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
public class OrderControllerTest {

  @Autowired
  private MockMvc mvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private OrderItemRepository orderItemRepository;

  @BeforeEach
  void setUp() {
    // 테스트용 사용자 생성
    User user = User.builder()
        .email("test@example.com")
        .password("password")
        .name("testuser")
        .role(UserRole.USER)
        .build();
    userRepository.save(user);

    // 테스트용 상품 생성
    Product product1 = Product.builder()
        .productName("아메리카노")
        .price(4500)
        .stock(100)
        .build();
    productRepository.save(product1);

    Product product2 = Product.builder()
        .productName("카페라떼")
        .price(5000)
        .stock(100)
        .build();
    productRepository.save(product2);
  }

  @Test
  @DisplayName("주문 생성 성공 테스트")
  void t1() throws Exception {
    // given
    Product product1 = productRepository.findAll().get(0);
    Product product2 = productRepository.findAll().get(1);

    String requestBody = String.format("""
    {
      "products": [
        { "productId": "%d", "productCount": "2" },
        { "productId": "%d", "productCount": "1" }
      ],
      "userEmail": "test@example.com",
      "address": "서울시 강남구 역삼동 123-45"
    }
    """, product1.getProductId(), product2.getProductId());

    mvc.perform(
            post("/orders/write")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.resultCode").value("201-CREATED"))
        .andExpect(jsonPath("$.msg").value("주문 생성 성공"))
        .andExpect(jsonPath("$.data.email").value("test@example.com"))
        .andDo(print());
  }

  @Test
  @DisplayName("주문 세부 정보 조회 성공 테스트")
  void t2() throws Exception {
    System.out.println(orderItemRepository.findAll());
  }
}
