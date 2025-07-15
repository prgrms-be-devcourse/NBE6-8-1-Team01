package com.back.teamcoffee.domain.user.repository;

import com.back.teamcoffee.domain.user.dto.UserDto;
import com.back.teamcoffee.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
    UserDto findByEmail(String email);
}
