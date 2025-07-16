package com.back.teamcoffee.domain.order.order.service;


import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.order.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderItemService {
  private final OrderRepository orderRepository;

  public Optional<Order> findByEmail(String email) {
    return orderRepository.findByEmail(email);
  }

  public Order write(String user, int orderCount, String productName, int totalPrice, String address, String email) {
    Order post = new Order(
        user,
        orderCount,
        productName,
        totalPrice,
        address,
        email
    );

    return orderRepository.save(post);
  }

}
