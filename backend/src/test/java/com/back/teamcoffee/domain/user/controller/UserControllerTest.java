package com.back.teamcoffee.domain.user.controller;

import com.back.teamcoffee.domain.user.dto.UserLoginRequestDto;
import com.back.teamcoffee.domain.user.dto.UserRegisterRequestDto;
import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import com.back.teamcoffee.domain.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
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
    @Autowired
    private PasswordEncoder passwordEncoder;



    private final String testUsername = "testuser";
    private final String testPassword = "testpassword";
    private final String testEmail = "test@email.com";
    @BeforeEach
    void setUp() {
        // 각 테스트 전에 데이터 초기화
        userRepository.deleteAll();


        User user = User.builder()
                .address("테스트 주소")
                .name(testUsername)
                .email(testEmail)
                .password(passwordEncoder.encode(testPassword))
                .role(UserRole.valueOf("USER"))
                .build();
        userRepository.save(user);

    }
    @Test
    @DisplayName("회원가입 테스트")
    void t1()  throws Exception {
        UserRegisterRequestDto req = new UserRegisterRequestDto(
                "newuser",
                "test@email1.com",
                "1234",
                "testaddress",
                UserRole.USER
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
        UserRegisterRequestDto req = new UserRegisterRequestDto(
                "testname",
                testEmail,
                "1234",
                "testaddress",
                UserRole.USER
        );
        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.resultCode").value("409-EMAIL-EXISTS"))
                .andExpect(jsonPath("$.msg").value("이미 존재하는 이메일입니다:"+ req.email()));

    }

    @Test
    @DisplayName("회원가입 실패 - 비밀번호 누락")
    void t3() throws Exception {
        UserRegisterRequestDto req = new UserRegisterRequestDto(
                "testname",
                "test@email.com",
                "",
                "testaddress",
                UserRole.USER
        );

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").exists());
    }

    @Test
    @DisplayName("회원가입 실패 - 이메일 형식 오류")
    void t4() throws Exception {
        UserRegisterRequestDto req = new UserRegisterRequestDto(
                "testname",
                "invalid-email",
                "1234",
                "testaddress",
                UserRole.USER
        );

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").exists());
    }


    @Test
    @DisplayName("회원가입 실패 - 이름 누락")
    void t5() throws Exception {
        UserRegisterRequestDto req = new UserRegisterRequestDto(
                "",
                "test@email.com",
                "1234",
                "testaddress",
                UserRole.USER
        );
        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").exists());
    }

    @Test
    @DisplayName("회원가입 실패 - 비밀번호 길이 부족")
    void t6() throws Exception {
        UserRegisterRequestDto req = new UserRegisterRequestDto(
                "testname",
                "test@email.com",
                "123",
                "testaddress",
                UserRole.USER
        );
        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").value("비밀번호는 4자 이상이어야 합니다."));
    }

    @Test
    @DisplayName("로그인 성공")
    void t7() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                testUsername,
                testEmail,
                testPassword,

                UserRole.USER
        );

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-OK"))
                .andExpect(jsonPath("$.data.user.email").value(testEmail))
                .andExpect(cookie().exists("AccessToken"))
                .andExpect(cookie().exists("RefreshToken"));
    }

    @Test
    @DisplayName("로그인 실패 - 잘못된 비밀번호")
    void t8() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                testUsername,
                testEmail,
                "wrongpassword",
                UserRole.USER
        );

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.resultCode").value("401-UNAUTHORIZED"))
                .andExpect(jsonPath("$.msg").value("비밀번호가 일치하지 않습니다."));

    }

    @Test
    @DisplayName("로그인 실패 - 존재하지 않는 이메일")
    void t9() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                "nonexistentuser",
                "test@Eamil.com",
                "1234",
                UserRole.USER
        );
        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.resultCode").value("404-NOT-FOUND"))
                .andExpect(jsonPath("$.msg").value("사용자를 찾을 수 없습니다."));

    }

    @Test
    @DisplayName("로그인 실패 - 비밀번호 누락")
    void t10() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                testUsername,
                testEmail,
                "",
                UserRole.USER
        );

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").exists());
    }

    @Test
    @DisplayName("로그인 실패 - 이메일 형식 오류")
    void t11() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                testUsername,
                "invalid-email",
                testPassword,
                UserRole.USER
        );

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").exists());
    }

    @Test
    @DisplayName("로그인 실패 - 이름 누락")
    void t12() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                "",
                testEmail,
                testPassword,
                UserRole.USER
        );

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").exists());
    }

    @Test
    @DisplayName("로그인 실패 - 비밀번호 길이 부족")
    void t13() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                testUsername,
                testEmail,
                "123",
                UserRole.USER
        );

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.resultCode").value("400-BAD-REQUEST"))
                .andExpect(jsonPath("$.msg").value("비밀번호는 4자 이상이어야 합니다."));
    }

    @Test
    @DisplayName("로그아웃 성공")
    void t14() throws Exception {



        // 로그인 후 쿠키 생성
        UserLoginRequestDto req = new UserLoginRequestDto(
                testUsername,
                testEmail,
                testPassword,
                UserRole.USER
        );

        MvcResult loginResult = mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(cookie().exists("AccessToken"))
                .andExpect(cookie().exists("RefreshToken"))
                .andReturn();

        Cookie accessToken = loginResult.getResponse().getCookie("AccessToken");
        Cookie refreshToken = loginResult.getResponse().getCookie("RefreshToken");
        // 로그아웃 요청
        mockMvc.perform(post("/users/logout")
                        .cookie(accessToken)
                        .cookie(refreshToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-LOGOUT"))
                .andExpect(jsonPath("$.msg").value("로그아웃 되었습니다."));
    }


    @Test
    @DisplayName("로그인 후 회원 탈퇴")
    void t15() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                testUsername,
                testEmail,
                testPassword,
                UserRole.USER
        );

        MvcResult loginResult = mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(cookie().exists("AccessToken"))
                .andExpect(cookie().exists("RefreshToken"))
                .andReturn();

        Cookie accessToken = loginResult.getResponse().getCookie("AccessToken");
        Cookie refreshToken = loginResult.getResponse().getCookie("RefreshToken");

        mockMvc.perform(delete("/users")
                        .param("email", testEmail)
                        .cookie(accessToken, refreshToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-DELETED"))
                .andExpect(jsonPath("$.msg").value("회원 탈퇴가 완료되었습니다."));

        assert userRepository.findByEmail(testEmail).isEmpty();
    }

    @Test
    @DisplayName("api 접속 권한 부족")
    void t16() throws Exception {
        UserLoginRequestDto req = new UserLoginRequestDto(
                testUsername,
                testEmail,
                testPassword,
                UserRole.USER
        );

        MvcResult loginResult = mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(cookie().exists("AccessToken"))
                .andExpect(cookie().exists("RefreshToken"))
                .andReturn();

        Cookie accessToken = loginResult.getResponse().getCookie("AccessToken");
        Cookie refreshToken = loginResult.getResponse().getCookie("RefreshToken");

        mockMvc.perform(post("/products")
                        .cookie(accessToken, refreshToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.resultCode").value("403-FORBIDDEN"))
                .andExpect(jsonPath("$.msg").value("접근 권한이 없습니다."));
    }

}
