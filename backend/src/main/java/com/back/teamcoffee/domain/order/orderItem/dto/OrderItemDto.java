package com.back.teamcoffee.domain.order.orderItem.dto;


import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.order.orderItem.entity.OrderItem;

import java.time.LocalDateTime;
import java.util.List;

public record OrderItemDto(
    long orderItemId,
    long productId,
    String productName,
    String productImage,
    int quantity,
    int price

) {
  public OrderItemDto(OrderItem orderItem) {
    this(
        orderItem.getOrderItemId(),
        orderItem.getProduct().getProductId(),
        orderItem.getProduct().getProductName(),
        orderItem.getProduct().getProductImage(),
        orderItem.getOrderCount(),
        orderItem.getProductPrice()
    );
  }
}