package com.back.teamcoffee.domain.wishlist.controller;

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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
class WishListControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private WishListRepository wishListRepository;
    
    @BeforeEach
    void setUp() {
        wishListRepository.deleteAll();
    }
    
    @Test
    @DisplayName("위시리스트 조회 성공")
    void 위시리스트_조회_테스트() throws Exception {
        // given - 테스트용 위시리스트 데이터 생성
        String email = "test@coffee.com";
        
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
        
        // when & then
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
        // given
        String email = "test@coffee.com";
        WishListCreateDto createDto = new WishListCreateDto(1L, 2);
        
        // when & then
        mockMvc.perform(post("/api/v1/wishlists/{email}", email)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createDto)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.resultCode").value("201-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트에 상품이 추가되었습니다."))
                .andExpect(jsonPath("$.data.productId").value(1))
                .andExpect(jsonPath("$.data.quantity").value(2));
        
        // DB 확인
        List<WishList> wishLists = wishListRepository.findByEmail(email);
        assertThat(wishLists).hasSize(1);
        assertThat(wishLists.get(0).getProductId()).isEqualTo(1L);
        assertThat(wishLists.get(0).getQuantity()).isEqualTo(2);
    }
    
    @Test
    @DisplayName("위시리스트 삭제 성공")
    void 위시리스트_삭제_테스트() throws Exception {
        // given - 삭제할 위시리스트 생성
        String email = "test@coffee.com";
        WishList wishList = new WishList();
        wishList.setProductId(1L);
        wishList.setEmail(email);
        wishList.setQuantity(1);
        WishList saved = wishListRepository.save(wishList);
        
        // when & then
        mockMvc.perform(delete("/api/v1/wishlists/{email}/{wishId}", email, saved.getWishId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트가 삭제되었습니다."));
        
        // DB 확인
        List<WishList> remaining = wishListRepository.findByEmail(email);
        assertThat(remaining).isEmpty();
    }
    
    @Test
    @DisplayName("위시리스트 수량 업데이트 성공")
    void 위시리스트_수량_업데이트_테스트() throws Exception {
        // given - 업데이트할 위시리스트 생성
        String email = "test@coffee.com";
        WishList wishList = new WishList();
        wishList.setProductId(1L);
        wishList.setEmail(email);
        wishList.setQuantity(1);
        WishList saved = wishListRepository.save(wishList);
        
        WishListUpdateDto updateDto = new WishListUpdateDto(5);
        
        // when & then
        mockMvc.perform(put("/api/v1/wishlists/{email}/{wishId}", email, saved.getWishId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDto)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트 수량이 업데이트되었습니다."))
                .andExpect(jsonPath("$.data.quantity").value(5));
        
        // DB 확인
        WishList updated = wishListRepository.findById(saved.getWishId()).orElseThrow();
        assertThat(updated.getQuantity()).isEqualTo(5);
    }
}