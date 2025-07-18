package com.back.teamcoffee.domain.order.order.entity;

import com.back.teamcoffee.domain.order.orderItem.entity.OrderItem;
import com.back.teamcoffee.domain.user.entity.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
@EntityListeners(AuditingEntityListener.class)
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
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(nullable = false)
  private LocalDateTime modifiedAt;

  private boolean deliveryStatus;

  @Column(length = 20)
  private String orderStatus;

  private int productId;

  @Column(length = 50)
  private String email;

  // 연관관계 추가: User.email 기준
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "email", referencedColumnName = "email", insertable = false, updatable = false)
  private User user;

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

  public void modify(String orderStatus) {
    this.orderStatus = orderStatus.isBlank() ? this.orderStatus : orderStatus;
    this.deliveryStatus = this.orderStatus.equals("배송 완료");
  }



}