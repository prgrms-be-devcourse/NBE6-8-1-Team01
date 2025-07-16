package com.back.teamcoffee.domain.user.controller;

import com.back.teamcoffee.domain.user.dto.UserLoginRequestDto;
import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import com.back.teamcoffee.domain.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;



    private final String testUsername = "testuser";
    private final String testPassword = "testpassword";
    private final String testEmail = "test@email.com";
    @BeforeEach
    void setUp() {
        // 각 테스트 전에 데이터 초기화
        userRepository.deleteAll();


        User user = User.builder()
                .name(testUsername)
                .email(testEmail)
                .password(testPassword)
                .role(UserRole.valueOf("USER"))
                .build();
        userRepository.save(user);

    }
    @Test
    @DisplayName("회원가입 테스트")
    void t1()  throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                "newuser",
                "test@email1.com",
                "1234"
        );
        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.resultCode").value("201-CREATED"))
                .andExpect(jsonPath("$.data.user.email").value(req.email()))
                .andExpect(cookie().exists("AccessToken"))
                .andExpect(cookie().exists("RefreshToken"));

        assert userRepository.findByEmail(req.email()).isPresent();
    }

    @Test
    @DisplayName("회원가입 이메일 중복")
    void t2() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                "testname",
                testEmail,
                "1234"
        );
        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.resultCode").value("409-EMAIL-EXISTS"))
                .andExpect(jsonPath("$.msg").value("이미 존재하는 이메일입니다."));

    }



}
