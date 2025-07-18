package com.back.teamcoffee.domain.wishlist.controller;

import com.back.teamcoffee.domain.user.entity.User;
import com.back.teamcoffee.domain.user.entity.UserRole;
import com.back.teamcoffee.domain.user.repository.UserRepository;
import com.back.teamcoffee.domain.wishlist.dto.WishListCreateDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListUpdateDto;
import com.back.teamcoffee.domain.wishlist.entity.WishList;
import com.back.teamcoffee.domain.wishlist.repository.WishListRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
@ActiveProfiles("test")
class WishListControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WishListRepository wishListRepository;

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        wishListRepository.deleteAll();
        userRepository.deleteAll();

        // 사용자 먼저 저장
        user = User.builder()
                .email("test@coffee.com")
                .password("password")
                .name("testuser")
                .address("서울시 강남구 역삼동 123-45")
                .role(UserRole.USER)
                .build();

        userRepository.save(user);
    }

    @Test
    @DisplayName("위시리스트 조회 성공")
    void 위시리스트_조회_테스트() throws Exception {
        String email = user.getEmail();

        WishList wishList1 = new WishList();
        wishList1.setProductId(1L);
        wishList1.setEmail(email);
        wishList1.setQuantity(1);
        wishListRepository.save(wishList1);

        WishList wishList2 = new WishList();
        wishList2.setProductId(2L);
        wishList2.setEmail(email);
        wishList2.setQuantity(2);
        wishListRepository.save(wishList2);

        mockMvc.perform(get("/api/v1/wishlists/{email}", email))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트 조회 성공"))
                .andExpect(jsonPath("$.data.length()").value(2));
    }

    @Test
    @DisplayName("위시리스트 추가 성공 + DB 확인")
    void 위시리스트_추가_테스트() throws Exception {
        String email = user.getEmail();
        WishListCreateDto createDto = new WishListCreateDto(1L, 2);

        mockMvc.perform(post("/api/v1/wishlists/{email}", email)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createDto)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.resultCode").value("201-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트에 상품이 추가되었습니다."))
                .andExpect(jsonPath("$.data.productId").value(1))
                .andExpect(jsonPath("$.data.quantity").value(2));

        List<WishList> wishLists = wishListRepository.findByEmail(email);
        assertThat(wishLists).hasSize(1);
        assertThat(wishLists.get(0).getProductId()).isEqualTo(1L);
        assertThat(wishLists.get(0).getQuantity()).isEqualTo(2);
    }

    @Test
    @DisplayName("위시리스트 삭제 성공")
    void 위시리스트_삭제_테스트() throws Exception {
        String email = user.getEmail();
        WishList wishList = new WishList();
        wishList.setProductId(1L);
        wishList.setEmail(email);
        wishList.setQuantity(1);
        WishList saved = wishListRepository.save(wishList);

        mockMvc.perform(delete("/api/v1/wishlists/{email}/{wishId}", email, saved.getWishId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트가 삭제되었습니다."));

        List<WishList> remaining = wishListRepository.findByEmail(email);
        assertThat(remaining).isEmpty();
    }

    @Test
    @DisplayName("위시리스트 수량 업데이트 성공")
    void 위시리스트_수량_업데이트_테스트() throws Exception {
        String email = user.getEmail();
        WishList wishList = new WishList();
        wishList.setProductId(1L);
        wishList.setEmail(email);
        wishList.setQuantity(1);
        WishList saved = wishListRepository.save(wishList);

        WishListUpdateDto updateDto = new WishListUpdateDto(5);

        mockMvc.perform(put("/api/v1/wishlists/{email}/{wishId}", email, saved.getWishId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDto)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트 수량이 업데이트되었습니다."))
                .andExpect(jsonPath("$.data.quantity").value(5));

        WishList updated = wishListRepository.findById(saved.getWishId()).orElseThrow();
        assertThat(updated.getQuantity()).isEqualTo(5);
    }
}