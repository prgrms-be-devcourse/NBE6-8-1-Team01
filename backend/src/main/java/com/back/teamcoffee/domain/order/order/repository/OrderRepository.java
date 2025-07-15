package com.back.teamcoffee.domain.order.order.repository;

import com.back.teamcoffee.domain.order.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
