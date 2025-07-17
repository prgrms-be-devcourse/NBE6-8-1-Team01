package com.back.teamcoffee.domain.user.service;

import com.back.teamcoffee.domain.user.dto.*;
import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import com.back.teamcoffee.domain.user.repository.UserRepository;
import com.back.teamcoffee.global.rsdata.RsData;
import com.back.teamcoffee.global.security.JwtTokenProvider;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwt;


    public RsData<LoginResultDto> register(UserRegisterRequestDto req) {
        if(userRepository.findByEmail(req.email()).isPresent()) {
            return RsData.of("409-EMAIL-EXISTS", "이미 존재하는 이메일입니다.", null);
        }
        UserRole role = req.role() != null ? req.role() : UserRole.USER;
        User user = userRepository.save(
                User.builder()
                        .email(req.email())
                        .password(passwordEncoder.encode(req.password()))
                        .name(req.username())
                        .role(role)
                        .build()
        );
        return successResult("201-CREATED", "회원가입 성공", user);

    }

    public RsData<LoginResultDto> login(UserLoginRequestDto req) {
        User user = userRepository.findByEmail(req.email())
                .orElse(null);
        if (user == null) {
            return RsData.of("404-NOT-FOUND", "존재하지 않는 이메일입니다.", null);
        }

        if(!passwordEncoder.matches(req.password(), user.getPassword())) {
            return RsData.of("401-INVALID-PASSWORD", "비밀번호가 일치하지 않습니다.", null);
        }


        return successResult("200-OK", "로그인 성공", user);
    }



    public void deleteuser(@Email String email) {
        User user = userRepository.findByEmail(email).orElse(null);

        assert user != null;
        userRepository.delete(user);
    }


    private RsData<LoginResultDto> successResult(String code, String msg, User user) {
        AuthTokensDto tokens = AuthTokensDto.of(
                jwt.createToken(user.getId(), user.getRole()),
                jwt.createRefreshToken(user.getId(), user.getRole())
        );
        LoginResultDto result = LoginResultDto.of(UserLoginResponseDto.from(user), tokens);
        return RsData.of(code, msg, result);
    }
}
