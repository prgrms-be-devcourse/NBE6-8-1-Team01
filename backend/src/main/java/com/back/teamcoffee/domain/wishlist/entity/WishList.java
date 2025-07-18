package com.back.teamcoffee.domain.wishlist.entity;

import com.back.teamcoffee.domain.user.entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "wish_list") //JPA 어노테이션 DB 테이블명 지정 *없으면 클래스명으로 테이블 생성*
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_id")
    private Long wishId;

    @Column(name = "product_id", nullable = false)
            private Long productId;

    @Column(name = "email", nullable = false, length = 50)
            private String email;
    
    @Column(name = "quantity", nullable = false)
    private int quantity;

    // 연관관계 추가: User.email 기준
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email", referencedColumnName = "email", insertable = false, updatable = false)
    @JsonBackReference
    private User user;
}