package com.back.teamcoffee.domain.user.entity;


import com.back.teamcoffee.domain.order.order.entity.Order;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.PERSIST;
import static jakarta.persistence.CascadeType.REMOVE;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;
    @NotBlank
    private String name;
    @NotBlank
    @Column(name = "email", unique = true)
    @Email
    private String email;
    @NotBlank
    private String address;
    @NotBlank
    private String password;
    @Column(updatable = false)
    private LocalDateTime created_at;

    // 연관관계 추가: Order.email 기준
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = {PERSIST, REMOVE}, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;


    @PrePersist
    void prePersist() {
        if(this.created_at == null)
            created_at = LocalDateTime.now();
    }
}
