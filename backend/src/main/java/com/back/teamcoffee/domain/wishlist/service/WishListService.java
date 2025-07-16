package com.back.teamcoffee.domain.wishlist.service;

import com.back.teamcoffee.domain.wishlist.dto.WishListCreateDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListUpdateDto;
import com.back.teamcoffee.domain.wishlist.entity.WishList;
import com.back.teamcoffee.domain.wishlist.repository.WishListRepository;
import com.back.teamcoffee.global.rsdata.RsData;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WishListService {

    private final WishListRepository wishListRepository;

    public RsData<WishListDto> create(String email, WishListCreateDto wishListCreateDto) {
        WishList wishList = new WishList();
        wishList.setProductId(wishListCreateDto.productId());
        wishList.setEmail(email);
        wishList.setQuantity(wishListCreateDto.quantity());

        WishList saved = wishListRepository.save(wishList);

        WishListDto wishListDto = new WishListDto(
                saved.getWishId(),
                saved.getProductId(),
                "더미 상품 1",
                5000,
                saved.getEmail(),
                saved.getQuantity()
        );
                return RsData.of("201-1", "위시리스트에 상품이 추가되었습니다.", wishListDto);
    }

    public RsData<List<WishListDto>> findAllByEmail(String email) {
        List<WishListDto> wishListDtos = wishListRepository.findByEmail(email)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return RsData.of("200-1", "위시리스트 조회 성공", wishListDtos);
            }



    public RsData<Void> deleteByEmailAndWishId(String email, Long wishId) {

        Optional<WishList> found = wishListRepository.findByEmailAndWishId(email, wishId);

        if (found.isEmpty()) {
            return RsData.error("404-1", "위시리스트가 존재하지 않습니다.");
        }

        wishListRepository.deleteByEmailAndWishId(email, wishId);

        return RsData.of("200-1", "위시리스트가 삭제되었습니다.");

    }


    public RsData<WishListDto> updateWishListQuantity(String email, Long wishId, WishListUpdateDto wishListUpdateDto) {
        Optional<WishList> found = wishListRepository.findByEmailAndWishId(email, wishId);

        if(found.isEmpty()) {
            return  RsData.error("404-1", "위시리스트가 존재하지 않습니다.");
        }

        WishList wishList = found.get();
        wishList.setQuantity(wishListUpdateDto.quantity());
        WishList updatedWishList = wishListRepository.save(wishList);

        return RsData.of("200-1", "위시리스트 수량이 업데이트되었습니다.", toDto(updatedWishList));
    }

    private WishListDto toDto(WishList wishList) {
        return new WishListDto(
                wishList.getWishId(),
                wishList.getProductId(),
                "더미 상품",
                5000,
                wishList.getEmail(),
                wishList.getQuantity()
        );
    }
}
