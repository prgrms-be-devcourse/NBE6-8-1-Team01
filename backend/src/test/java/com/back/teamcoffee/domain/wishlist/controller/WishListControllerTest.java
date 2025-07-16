package com.back.teamcoffee.domain.wishlist.controller;

import com.back.teamcoffee.domain.wishlist.service.WishListService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import com.back.teamcoffee.domain.wishlist.dto.WishListCreateDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListDto;
import com.back.teamcoffee.global.rsdata.RsData;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
class WishListControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private WishListService wishListService;
    
    @Test
    void 위시리스트_조회_테스트() throws Exception {
        // given - 특정 사용자의 위시리스트 조회
        String email = "test@coffee.com";
        
        // Mock 응답 데이터 준비 (여러 개의 위시리스트)
        List<WishListDto> mockList = List.of(
                new WishListDto(1L, 1L, "아메리카노", 4500, email, 1),
                new WishListDto(2L, 2L, "카페라떼", 5000, email, 2)
        );
        RsData<List<WishListDto>> mockRsData = RsData.of("200-1", "위시리스트 조회 성공", mockList);
        
        // Service Mock 설정
        when(wishListService.findAllByEmail(email))
                .thenReturn(mockRsData);
        
        // when & then
        mockMvc.perform(get("/api/v1/wishlists/{email}", email))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트 조회 성공"))
                .andExpect(jsonPath("$.data[0].wishId").value(1))
                .andExpect(jsonPath("$.data[0].productName").value("아메리카노"))
                .andExpect(jsonPath("$.data[1].wishId").value(2))
                .andExpect(jsonPath("$.data[1].productName").value("카페라떼"))
                .andExpect(jsonPath("$.data.length()").value(2));
    }
    
    @Test
    void 위시리스트_추가_테스트() throws Exception {
        // given - 테스트에 필요한 데이터를 준비하는 단계
        String email = "test@coffee.com";
        String requestBody = """
            {
                "productId": 1,
                "quantity": 2
            }
            """;
        
        // Mock 응답 데이터 준비
        WishListDto mockDto = new WishListDto(1L, 1L, "더미 상품 1", 5000, email, 2);
        RsData<WishListDto> mockRsData = RsData.of("201-1", "위시리스트에 상품이 추가되었습니다.", mockDto);
        
        // Service Mock 설정
        when(wishListService.create(eq(email), any(WishListCreateDto.class)))
                .thenReturn(mockRsData);
        
        // when & then - 실제 요청을 보내고(when) 결과를 검증하는(then) 단계
        mockMvc.perform(post("/api/v1/wishlists/{email}", email)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isCreated())  // 201
                .andExpect(jsonPath("$.resultCode").value("201-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트에 상품이 추가되었습니다."))
                .andExpect(jsonPath("$.data.wishId").value(1))
                .andExpect(jsonPath("$.data.productId").value(1))
                .andExpect(jsonPath("$.data.productName").value("더미 상품 1"))
                .andExpect(jsonPath("$.data.productPrice").value(5000))
                .andExpect(jsonPath("$.data.email").value("test@coffee.com"))
                .andExpect(jsonPath("$.data.quantity").value(2));
    }
    
    @Test
    void 위시리스트_삭제_테스트() throws Exception {
        // given - 삭제할 위시리스트 ID와 사용자 이메일 준비
        Long wishId = 1L;
        String email = "test@coffee.com";
        
        // Mock 응답 데이터 준비 - 삭제는 데이터 없이 메시지만
        RsData<Void> mockRsData = RsData.of("200-1", "위시리스트가 삭제되었습니다.");
        
        // Service Mock 설정 - email과 wishId 둘 다 받음
        when(wishListService.deleteByEmailAndWishId(email, wishId))
                .thenReturn(mockRsData);
        
        // when & then - DELETE 요청 보내고 결과 검증
        mockMvc.perform(delete("/api/v1/wishlists/{email}/{wishId}", email, wishId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("위시리스트가 삭제되었습니다."))
                .andExpect(jsonPath("$.data").isEmpty());  // 삭제는 data가 null
    }
}