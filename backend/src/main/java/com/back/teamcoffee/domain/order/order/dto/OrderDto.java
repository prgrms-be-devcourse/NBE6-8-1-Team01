package com.back.teamcoffee.domain.order.order.dto;


import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.order.orderItem.entity.OrderItem;

import java.time.LocalDateTime;
import java.util.List;

public record OrderDto(
    long orderId,
    String user,
    int orderCount,
    String productName,
    int totalPrice,
    String address,
    LocalDateTime createDate,
    LocalDateTime modifiedDate,
    boolean deliveryStatus,
    String orderStatus,
    String email,
    List<OrderItem> orderItems
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
        order.getOrderItems()
    );
  }
}