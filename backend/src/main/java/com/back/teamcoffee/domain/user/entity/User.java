package com.back.teamcoffee.domain.user.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

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
    private String name;
    @NotBlank
    @Column(name = "email", unique = true)
    @Email
    private String email;
    private String address;
    private String password;
    private LocalDateTime created_at;
    private UserRole role;

}
