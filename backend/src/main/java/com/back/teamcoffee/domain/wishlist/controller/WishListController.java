package com.back.teamcoffee.domain.wishlist.controller;

import com.back.teamcoffee.domain.wishlist.dto.WishListCreateDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListDto;
import com.back.teamcoffee.domain.wishlist.entity.WishList;
import com.back.teamcoffee.domain.wishlist.service.WishListService;
import com.back.teamcoffee.global.rsdata.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wishlists")
@RequiredArgsConstructor
public class WishListController {
    private final WishListService wishListService;

    @PostMapping("/{email}")
    public ResponseEntity<RsData<WishListDto>> createWishList(
            @PathVariable String email,
            @RequestBody WishListCreateDto wishListCreateDto) {
        RsData<WishListDto> wishListDto = wishListService.create(email, wishListCreateDto);
        return ResponseEntity.status(201).body(wishListDto);
    }

    @GetMapping("/{email}")
    public ResponseEntity<RsData<List<WishListDto>>> getWishLists(
            @PathVariable String email) {
        RsData<List<WishListDto>> wishListDtos = wishListService.findAllByEmail(email);
        return ResponseEntity.ok(wishListDtos);
    }

    @DeleteMapping("/{email}/{wishId}")
    public ResponseEntity<RsData<Void>> deleteWishList(
            @PathVariable String email,
            @PathVariable Long wishId) {
                RsData<Void> result = wishListService.deleteByEmailAndWishId(email, wishId);
                return ResponseEntity.ok(result);
    }
}
