package com.back.teamcoffee.domain.order.order.controller;

import com.back.teamcoffee.domain.order.order.dto.OrderDto;
import com.back.teamcoffee.domain.order.order.dto.OrderWriteReqBody;
import com.back.teamcoffee.domain.order.order.service.OrderService;
import com.back.teamcoffee.global.rsdata.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Tag(name = "OrderController", description = "API 오더 컨트롤러")
public class OrderController {
  private final OrderService orderService;

  // 요청 예시
  //{
  //  "products": [
  //    { "productId": "1", "productCount": 2 },
  //    { "productId": "2", "productCount": 1 }
  //  ],
  //  "userEmail": "test@example.com"
  //}


  // 주문 생성
  @PostMapping("/write")
  @Transactional
  @Operation(summary = "주문 생성")
  public ResponseEntity<RsData<OrderDto>> orderWrite(@Valid @RequestBody OrderWriteReqBody orderWriteReqBody) {
    RsData<OrderDto> order = orderService.write(orderWriteReqBody);
    return ResponseEntity.status(201).body(order);
  }

  // 이메일로 주문내역 조회
  @GetMapping("/lists")
  @Transactional(readOnly = true)
  @Operation(summary = "이메일로 주문 내역 조회")
  public ResponseEntity<RsData<List<OrderDto>>> getOrderListByEmail(@RequestParam String email) {
    RsData<List<OrderDto>> orders = orderService.findByEmail(email);
    return ResponseEntity.ok(orders);
  }

  // 주문 내역 단건 조회
  @GetMapping("/lists/{orderId}")
  @Transactional(readOnly = true)
  @Operation(summary = "주문 내역 단건 조회")
  public ResponseEntity<RsData<OrderDto>> getOrderById(@PathVariable long orderId) {
    RsData<OrderDto> order = orderService.findById(orderId);
    return ResponseEntity.ok(order);
  }


  // 주문 상태 변경 (예: 결제 완료, 배송 중 등)
  @PutMapping("/modify")
  @Transactional
  @Operation(summary = "주문 상태 변경")
  public ResponseEntity<RsData<OrderDto>> modifyOrder(@RequestBody OrderDto orderDto) {
    RsData<OrderDto> updatedOrder = orderService.modifyOrder(orderDto);
    return ResponseEntity.ok(updatedOrder);
  }

  // 주문 취소
  @DeleteMapping("/delete/{orderId}")
  @Transactional
  @Operation(summary = "주문 취소")
  public ResponseEntity<RsData<OrderDto>> deleteOrder(@PathVariable long orderId) {
    RsData<OrderDto> deletedOrder = orderService.deleteOrder(orderId);
    return ResponseEntity.ok(deletedOrder);
  }

  // 전날 2시 ~ 오늘 오후 2시 사이에 주문된 내역 조회
  @GetMapping("/lists/today")
  @Transactional(readOnly = true)
  @Operation(summary = "오늘 주문 내역 조회")
  public ResponseEntity<RsData<List<OrderDto>>> getTodayOrders() {
    RsData<List<OrderDto>> todayOrders = orderService.findTodayOrders();
    return ResponseEntity.ok(todayOrders);
  }


}