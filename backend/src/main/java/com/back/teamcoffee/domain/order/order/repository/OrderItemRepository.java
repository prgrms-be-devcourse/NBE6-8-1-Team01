package com.back.teamcoffee.domain.order.order.repository;

import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.order.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
