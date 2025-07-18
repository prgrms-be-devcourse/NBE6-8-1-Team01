package com.back.teamcoffee.global.security;

import com.back.teamcoffee.domain.user.repository.UserRepository;
import com.back.teamcoffee.global.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws DataNotFoundException {
        var u = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not found" + email));
        return User
                .withUsername(u.getEmail())             // 또는 u.getName()
                .password(u.getPassword())              // DB에 저장된 BCrypt 해시
                .roles(u.getRole().name())
                .build();
    }

}
