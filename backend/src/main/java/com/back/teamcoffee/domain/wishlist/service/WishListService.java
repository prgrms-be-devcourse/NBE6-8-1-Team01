package com.back.teamcoffee.domain.wishlist.service;

import com.back.teamcoffee.domain.product.entity.Product;
import com.back.teamcoffee.domain.product.repository.ProductRepository;
import com.back.teamcoffee.domain.wishlist.dto.WishListCreateDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListDto;
import com.back.teamcoffee.domain.wishlist.dto.WishListUpdateDto;
import com.back.teamcoffee.domain.wishlist.entity.WishList;
import com.back.teamcoffee.domain.wishlist.repository.WishListRepository;
import com.back.teamcoffee.global.exception.DataNotFoundException;
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
    private final ProductRepository productRepository;

    public RsData<WishListDto> create(String email, WishListCreateDto wishListCreateDto) {
        Optional<Product> productOpt = productRepository.findById(wishListCreateDto.productId());

        if (productOpt.isEmpty()) {
            throw new DataNotFoundException("존재하지 않는 상품입니다.");
        }

        Product product = productOpt.get();
        
        // 중복 체크: 이미 해당 상품이 위시리스트에 있는지 확인
        Optional<WishList> existingWishList = wishListRepository.findByEmailAndProductId(email, product.getProductId());
        
        if (existingWishList.isPresent()) {
            // 이미 존재하는 경우, 수량을 증가시킴
            WishList wishList = existingWishList.get();
            wishList.setQuantity(wishList.getQuantity() + wishListCreateDto.quantity());
            WishList updated = wishListRepository.save(wishList);
            
            WishListDto wishListDto = new WishListDto(
                    updated.getWishId(),
                    product.getProductId(),
                    product.getProductName(),
                    product.getPrice(),
                    updated.getEmail(),
                    updated.getQuantity()
            );
            
            return RsData.of("200-OK", "위시리스트 상품 수량이 증가되었습니다.", wishListDto);
        }

        // 새로운 위시리스트 항목 생성
        WishList wishList = new WishList();
        wishList.setProductId(product.getProductId());
        wishList.setEmail(email);
        wishList.setQuantity(wishListCreateDto.quantity());

        WishList saved = wishListRepository.save(wishList);

        WishListDto wishListDto = new WishListDto(
                saved.getWishId(),
                product.getProductId(),
                product.getProductName(),
                product.getPrice(),
                saved.getEmail(),
                saved.getQuantity()
        );

        return RsData.of("201-CREATED", "위시리스트에 상품이 추가되었습니다.", wishListDto);
    }

    public RsData<List<WishListDto>> findAllByEmail(String email) {
        List<WishListDto> wishListDtos = wishListRepository.findByEmail(email)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return RsData.of("200-OK", "위시리스트 조회 성공", wishListDtos);
            }



    public RsData<Void> deleteByEmailAndWishId(String email, Long wishId) {

        Optional<WishList> found = wishListRepository.findByEmailAndWishId(email, wishId);

        if (found.isEmpty()) {
            return RsData.error("404-NOT_FOUND", "위시리스트가 존재하지 않습니다.");
        }

        wishListRepository.deleteByEmailAndWishId(email, wishId);

        return RsData.of("200-OK", "위시리스트가 삭제되었습니다.");

    }


    public RsData<WishListDto> updateWishListQuantity(String email, Long wishId, WishListUpdateDto wishListUpdateDto) {
        Optional<WishList> found = wishListRepository.findByEmailAndWishId(email, wishId);

        if(found.isEmpty()) {
            return  RsData.error("404-NOT_FOUND", "위시리스트가 존재하지 않습니다.");
        }

        WishList wishList = found.get();
        wishList.setQuantity(wishListUpdateDto.quantity());
        WishList updatedWishList = wishListRepository.save(wishList);

        return RsData.of("200-OK", "위시리스트 수량이 업데이트되었습니다.", toDto(updatedWishList));
    }

    private WishListDto toDto(WishList wishList) {
        Product product = productRepository.findById(wishList.getProductId())
                .orElseThrow(() -> new DataNotFoundException("존재하지 않는 상품입니다."));

        return new WishListDto(
                wishList.getWishId(),
                product.getProductId(),
                product.getProductName(),
                product.getPrice(),
                wishList.getEmail(),
                wishList.getQuantity()
        );
    }
}
