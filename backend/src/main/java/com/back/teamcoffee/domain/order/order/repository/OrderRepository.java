package com.back.teamcoffee.domain.order.order.repository;

import com.back.teamcoffee.domain.order.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

  List<Order> findByEmail(String email);
}
