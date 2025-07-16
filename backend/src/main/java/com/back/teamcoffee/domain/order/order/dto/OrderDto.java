package com.back.teamcoffee.domain.order.order.dto;


import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.user.entity.User;

import java.time.LocalDateTime;

public record OrderDto(
    long orderId,
    String user,
    int orderCount,
    String productName,
    int totalPrice,
    String address,
    LocalDateTime createDate,
    boolean deliveryStatus,
    String orderStatus,
    String email
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
        order.isDeliveryStatus(),
        order.getOrderStatus(),
        order.getEmail()
    );
  }
}