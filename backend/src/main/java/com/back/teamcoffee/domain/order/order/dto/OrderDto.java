package com.back.teamcoffee.domain.order.order.dto;


import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.order.orderItem.dto.OrderItemDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record OrderDto(
    long orderId,
    @NotBlank
    String user,
    int orderCount,
    @NotBlank
    String productName,
    int totalPrice,
    @NotBlank
    String address,
    LocalDateTime createDate,
    LocalDateTime modifiedDate,
    boolean deliveryStatus,
    String orderStatus,
    @NotBlank
    @Size(min = 10, max = 100)
    String email,
    List<OrderItemDto> orderItems
) {
  public OrderDto(Order order) {
    this(
        order.getOrderId(),
        order.getUserId(),
        order.getOrderCount(),
        order.getProductName(),
        order.getTotalPrice(),
        order.getAddress(),
        order.getCreatedAt(),
        order.getModifiedAt(),
        order.isDeliveryStatus(),
        order.getOrderStatus(),
        order.getEmail(),
        order.getOrderItems() != null ? 
            order.getOrderItems().stream()
                .map(OrderItemDto::new)
                .collect(Collectors.toList()) : 
            List.of()
    );
  }
}