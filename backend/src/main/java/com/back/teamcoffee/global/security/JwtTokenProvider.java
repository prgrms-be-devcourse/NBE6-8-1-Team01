package com.back.teamcoffee.global.security;

import com.back.teamcoffee.domain.user.entity.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider  {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.refresh-exp}")
    private long refreshExp;
    @Value("${jwt.access-exp}")
    private long accessExp;

    private SecretKey key;

    @PostConstruct
    private void init() {
        byte[] decoded = Base64.getDecoder().decode(secret);
        this.key = new SecretKeySpec(decoded, 0, decoded.length, "HmacSHA256");
    }
    public String createToken(int userId, UserRole userRole) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("role", userRole.name())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessExp))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }

    public String createRefreshToken(int userId, UserRole userRole) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("role", userRole.name())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshExp))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        int userId = Integer.parseInt(claims.getSubject());
        String role = claims.get("role", String.class);
        return new UsernamePasswordAuthenticationToken(
                userId,
                null,
                Collections.singleton(new SimpleGrantedAuthority(role))
        );

    }
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
