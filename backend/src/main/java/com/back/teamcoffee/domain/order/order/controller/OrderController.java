package com.back.teamcoffee.domain.order.order.controller;

import com.back.teamcoffee.domain.order.order.dto.OrderDto;
import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.order.order.service.OrderService;
import com.back.teamcoffee.domain.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Tag(name = "OrderController", description = "API 오더 컨트롤러")
public class OrderController {
  private final OrderService orderService;
  // 주문 생성 request body
  record OrderWriteReqBody(
      @NotBlank
      @Size(min = 1, max = 100)
      String userId,
      @NotBlank
      @Size(min = 1, max = 100)
      int orderCount,
      @NotBlank
      @Size(min = 2, max = 100)
      String productName,
      @NotBlank
      int totalPrice,
      @NotBlank
      @Size(min = 2, max = 300)
      String address,
      @NotBlank
      @Size(min = 5, max = 50)
      String email
  ) {
  }
  // 주문 생성
  @PostMapping
  @Transactional
  @Operation(summary = "주문 생성")
  public OrderDto createOrder(@Valid @RequestBody OrderWriteReqBody orderWriteReqBody) {
    // 주문 저장
    Order savedOrder = orderService.write(orderWriteReqBody.userId(),
                                         orderWriteReqBody.orderCount(),
                                         orderWriteReqBody.productName(),
                                         orderWriteReqBody.totalPrice(),
                                         orderWriteReqBody.address(),
                                         orderWriteReqBody.email());

    // 저장된 주문을 OrderDto로 변환하여 반환
    return new OrderDto(savedOrder);
  }

  // 이메일로 주문내역 조회
  @GetMapping("/{email}")
  @Transactional(readOnly = true)
  @Operation(summary = "이메일로 주문 내역 조회")
  public List<OrderDto> getOrdersByEmail(String email) {
    Optional<Order> orders = orderService.findByEmail(email);

    return orders.stream()
                 .map(OrderDto::new) // OrderDto로 변환
                 .toList();
  }
  // 주문 내역 단건 조회



  // 주문 상태 변경 (예: 결제 완료, 배송 중 등)

  // 주문 취소




}
