package com.back.teamcoffee.domain.order.orderItem.dto;


import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.order.orderItem.entity.OrderItem;

import java.time.LocalDateTime;
import java.util.List;

public record OrderItemDto(
    long orderItemId,
    int orderCount,
    int productPrice,
    int totalPrice

) {
  public OrderItemDto(OrderItem orderItem) {
    this(
        orderItem.getOrderItemId(),
        orderItem.getOrderCount(),
        orderItem.getProductPrice(),
        orderItem.getTotalPrice()
    );
  }
}