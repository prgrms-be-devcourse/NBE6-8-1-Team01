package com.back.teamcoffee.domain.order.order.entity;

import com.back.teamcoffee.domain.product.entity.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class OrderItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderItemId;

  private int orderCount;

  private int productPrice;

  private int totalPrice;

  @ManyToOne
  private Order order;

  @ManyToOne
  private Product product;

}
