package com.back.teamcoffee.domain.order.order.entity;

import com.back.teamcoffee.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.service.spi.ServiceException;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

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

  @Column(length = 20)
  private String productName;

  private int totalPrice;

  @Column(length = 300)
  private String address;

  private LocalDateTime createdAt;

  private boolean deliveryStatus;

  @Column(length = 20)
  private String orderStatus;

  private Long productId;

  @Column(length = 50)
  private String email;

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

  private void modify(String orderStatus, boolean deliveryStatus) {
    this.orderStatus = orderStatus;
    this.deliveryStatus = deliveryStatus;
  }

}
