package com.back.teamcoffee.domain.order.order.controller;

import com.back.teamcoffee.domain.order.order.dto.OrderProductReq;
import com.back.teamcoffee.domain.order.order.dto.OrderWriteReqBody;
import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.order.order.repository.OrderRepository;
import com.back.teamcoffee.domain.order.order.service.OrderService;
import com.back.teamcoffee.domain.product.entity.Product;
import com.back.teamcoffee.domain.product.repository.ProductRepository;
import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import com.back.teamcoffee.domain.user.repository.UserRepository;
import com.back.teamcoffee.domain.order.order.dto.OrderDto;
import com.back.teamcoffee.global.rsdata.RsData;
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

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
  private OrderRepository orderRepository;

  @Autowired
  private OrderService orderService;

  private User user;
  private Product product1, product2;

  @BeforeEach
  void setUp() {
    userRepository.deleteAll();
    productRepository.deleteAll();
    orderRepository.deleteAll();

    // 테스트용 사용자 생성
    user = User.builder()
        .email("test@example.com")
        .password("password")
        .name("testuser")
        .address("서울시 강남구 역삼동 123-45")
        .role(UserRole.USER)
        .build();
    userRepository.save(user);

    // 테스트용 상품 생성
    product1 = Product.builder()
        .productName("아메리카노")
        .price(4500)
        .stock(100)
        .build();
    productRepository.save(product1);

    product2 = Product.builder()
        .productName("카페라떼")
        .price(5000)
        .stock(100)
        .build();
    productRepository.save(product2);
  }

  private Order createTestOrder() {
    List<OrderProductReq> products = new ArrayList<>();
    products.add(new OrderProductReq(String.valueOf(product1.getProductId()), 2));
    products.add(new OrderProductReq(String.valueOf(product2.getProductId()), 1));
    OrderWriteReqBody reqBody = new OrderWriteReqBody(products, user.getEmail(), "서울시 강남구 역삼동 123-45");
    RsData<OrderDto> rsData = orderService.write(reqBody);
    OrderDto orderDto = rsData.data();
    return orderRepository.findById(orderDto.orderId()).orElseThrow();
  }


  @Test
  @DisplayName("주문 생성 성공 테스트")
  void t1() throws Exception {
    // given
    String requestBody = String.format("""
    {
      "products": [
        { "productId": "%d", "productCount": 2 },
        { "productId": "%d", "productCount": 1 }
      ],
      "userEmail": "test@example.com",
      "address": "서울시 강남구 역삼동 123-45"
    }
    """, product1.getProductId(), product2.getProductId());

    // when & then
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
  @DisplayName("이메일로 주문 내역 조회 성공 테스트")
  void t2() throws Exception {
    // given
    createTestOrder();

    // when & then
    mvc.perform(get("/orders/lists")
            .param("email", user.getEmail())
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.resultCode").value("200-OK"))
        .andExpect(jsonPath("$.msg").value("주문 조회 성공"))
        .andExpect(jsonPath("$.data[0].email").value(user.getEmail()))
        .andDo(print());
  }

  @Test
  @DisplayName("주문 내역 단건 조회 성공 테스트")
  void t3() throws Exception {
    // given
    Order order = createTestOrder();

    // when & then
    mvc.perform(
            get("/orders/lists/{orderId}", order.getOrderId())
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.resultCode").value("200-OK"))
        .andExpect(jsonPath("$.msg").value("주문 조회 성공"))
        .andExpect(jsonPath("$.data.orderId").value(order.getOrderId()))
        .andDo(print());
  }

  @Test
  @DisplayName("주문 상태 변경 성공 테스트")
  void t4() throws Exception {
    // given
    Order order = createTestOrder();
    String requestBody = String.format("""
    {
      "orderId": %d,
      "orderStatus": "%s"
    }
    """, order.getOrderId(), "SHIPPED");

    // when & then
    mvc.perform(
            put("/orders/modify")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody)
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.resultCode").value("200-OK"))
        .andExpect(jsonPath("$.msg").value("주문 상태 변경 성공"))
        .andExpect(jsonPath("$.data.orderStatus").value("SHIPPED"))
        .andDo(print());
  }

  @Test
  @DisplayName("주문 취소 성공 테스트")
  void t5() throws Exception {
    // given
    Order order = createTestOrder();
    String requestBody = String.format("""
    {
      "orderId": %d,
    }
    """, order.getOrderId()); // 1은 SHIPPED 상태를 의미
    // when & then
    mvc.perform(
            delete("/orders/delete/{orderId}", order.getOrderId())
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.resultCode").value("200-OK"))
        .andExpect(jsonPath("$.msg").value("주문 취소 성공"))
        .andDo(print());
  }

  @Test
  @DisplayName("오늘 주문 내역 조회 성공 테스트")
  void t6() throws Exception {
    // given
    Order order = createTestOrder();
    System.out.println(order.getCreatedAt());
    // when & then
    mvc.perform(
            get("/orders/lists/today")
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.resultCode").value("200-OK"))
        .andExpect(jsonPath("$.msg").value("오늘 주문 내역 조회 성공"))
        .andExpect(jsonPath("$.data").isArray())
        .andDo(print());
  }

  @Test
  @DisplayName("오늘 주문 내역 조회 없음 테스트")
  void t7() throws Exception {
    // given
    Order order = createTestOrder();
    System.out.println(order.getCreatedAt());
    // when & then
    mvc.perform(
            get("/orders/lists/today")
        )
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.resultCode").value("404-NOT-FOUND"))
        .andExpect(jsonPath("$.msg").value("오늘 주문 내역이 없습니다."))
        .andDo(print());
  }
}
