package com.back.teamcoffee.global.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwt;
    public JwtAuthFilter(JwtTokenProvider jwt) {
        this.jwt = jwt;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws ServletException, IOException {
        String token = CookieUtil.resolveToken(req, "AccessToken");

        if(token != null && jwt.validateToken(token)) {
            Authentication auth = jwt.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(auth);

        }
        chain.doFilter(req, res);

    }



}
