package com.back.teamcoffee.domain.user.service;

import com.back.teamcoffee.domain.user.dto.AuthTokensDto;
import com.back.teamcoffee.domain.user.dto.LoginResultDto;
import com.back.teamcoffee.domain.user.dto.UserLoginRequestDto;
import com.back.teamcoffee.domain.user.dto.UserLoginResponseDto;
import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import com.back.teamcoffee.domain.user.repository.UserRepository;
import com.back.teamcoffee.global.rsdata.RsData;
import com.back.teamcoffee.global.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwt;


    public RsData<LoginResultDto> register(UserLoginRequestDto req) {
        if(userRepository.findByEmail(req.email()).isPresent()) {
            return RsData.of("409-EMAIL-EXISTS", "이미 존재하는 이메일입니다.", null);
        }

        User user = userRepository.save(
                User.builder()
                        .email(req.email())
                        .password(passwordEncoder.encode(req.password()))
                        .name(req.username())
                        .role(UserRole.valueOf("USER"))
                        .build()
        );
        AuthTokensDto tokens = new AuthTokensDto(
                jwt.createToken(user.getId(), user.getRole()),
                jwt.createRefreshToken(user.getId(), user.getRole())
        );

        LoginResultDto result = new LoginResultDto(
                new UserLoginResponseDto(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole()
                ),
                tokens
                        );

        return RsData.of(
                "201-CREATED",
                "회원가입이 완료되었습니다.",
                result
        );

    }
}
