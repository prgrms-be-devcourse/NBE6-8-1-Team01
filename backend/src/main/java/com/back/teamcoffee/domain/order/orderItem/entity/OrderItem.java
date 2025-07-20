package com.back.teamcoffee.domain.order.orderItem.entity;

import com.back.teamcoffee.domain.order.order.entity.Order;
import com.back.teamcoffee.domain.product.entity.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
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

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id")
  @JsonBackReference
  private Order order;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", referencedColumnName = "product_id", insertable = false, updatable = false)
  private Product product;

  @Builder
  public OrderItem(int orderCount, int productPrice, int totalPrice, Order order, Product product) {
    this.orderCount = orderCount;
    this.productPrice = productPrice;
    this.totalPrice = totalPrice;
    this.order = order;
    this.product = product;
  }
}