package com.back.teamcoffee.domain.order.order.repository;

import com.back.teamcoffee.domain.order.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

  List<Order> findByEmail(String email);
  
  @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.email = :email")
  List<Order> findByEmailWithItems(@Param("email") String email);
  
  @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.orderId = :orderId")
  Optional<Order> findByIdWithItems(@Param("orderId") Long orderId);

  List<Order> findByCreatedAtBetween(LocalDateTime createdAtAfter, LocalDateTime createdAtBefore);
  
  @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.createdAt BETWEEN :createdAtAfter AND :createdAtBefore")
  List<Order> findByCreatedAtBetweenWithItems(@Param("createdAtAfter") LocalDateTime createdAtAfter, @Param("createdAtBefore") LocalDateTime createdAtBefore);
}
