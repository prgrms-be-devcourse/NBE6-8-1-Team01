package com.back.teamcoffee.domain.wishlist.controller;

import com.back.teamcoffee.domain.wishlist.dto.WishListCreateDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListUpdateDto;
import com.back.teamcoffee.domain.wishlist.service.WishListService;
import com.back.teamcoffee.global.rsdata.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlists")
@RequiredArgsConstructor
public class WishListController {
    private final WishListService wishListService;

    // 위시리스트 생성
    @PostMapping("/{email}")
    public ResponseEntity<RsData<WishListDto>> createWishList(
            @PathVariable String email,
            @RequestBody @Valid WishListCreateDto wishListCreateDto) {
        RsData<WishListDto> wishListDto = wishListService.create(email, wishListCreateDto);
        return ResponseEntity.status(201).body(wishListDto);
    }

    // 위시리스트 조회
    @GetMapping("/{email}")
    public ResponseEntity<RsData<List<WishListDto>>> getWishLists(
            @PathVariable String email) {
        RsData<List<WishListDto>> wishListDtos = wishListService.findAllByEmail(email);
        return ResponseEntity.ok(wishListDtos);
    }

    // 위시리스트 상품 수량 변경
    @PutMapping("/{email}/{wishId}")
    public ResponseEntity<RsData<WishListDto>> updateWishListQuantity(
            @PathVariable String email,
            @PathVariable Long wishId,
            @RequestBody @Valid WishListUpdateDto wishListUpdateDto) {
        RsData<WishListDto> result = wishListService.updateWishListQuantity(email, wishId, wishListUpdateDto);
        return ResponseEntity.ok(result);
    }

    // 위시리스트 삭제
    @DeleteMapping("/{email}/{wishId}")
    public ResponseEntity<RsData<Void>> deleteWishList(
            @PathVariable String email,
            @PathVariable Long wishId) {
                RsData<Void> result = wishListService.deleteByEmailAndWishId(email, wishId);
                return ResponseEntity.ok(result);
    }
}
