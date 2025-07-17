package com.back.teamcoffee.domain.order.order.entity;

import com.back.teamcoffee.domain.order.orderItem.entity.OrderItem;
import com.back.teamcoffee.domain.product.entity.Product;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.PERSIST;
import static jakarta.persistence.CascadeType.REMOVE;
import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name = "\"order\"")
@NoArgsConstructor
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long orderId;

  @Column(length = 100, nullable = false)
  private String userId;

  private int orderCount;

  @Column(length = 100)
  private String productName;

  private int totalPrice;

  @Column(length = 300)
  private String address;

  @CreatedDate
  private LocalDateTime createdAt;

  private boolean deliveryStatus;

  @Column(length = 20)
  private String orderStatus;

  private int productId;

  @Column(length = 50)
  private String email;

  @OneToMany(mappedBy = "order", fetch = LAZY, cascade = {PERSIST, REMOVE}, orphanRemoval = true)
  @JsonManagedReference
  private List<OrderItem> orderItems = new ArrayList<>();

  @Builder
  public Order(String user, int orderCount, String productName, int totalPrice, String address, String email) {
    this.userId = user;
    this.orderCount = orderCount;
    this.productName = productName;
    this.totalPrice = totalPrice;
    this.address = address;
    this.email = email;
    this.deliveryStatus = false; // 기본값은 false로 설정
    this.orderStatus = "주문 접수"; // 기본 주문 상태
  }

  public void addOrderItem(OrderItem orderItem) {
    orderItems.add(orderItem);
  }

  private void modify(String orderStatus, boolean deliveryStatus) {
    this.orderStatus = orderStatus;
    this.deliveryStatus = deliveryStatus;
  }



}