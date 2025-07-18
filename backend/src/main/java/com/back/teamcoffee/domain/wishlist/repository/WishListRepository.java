package com.back.teamcoffee.domain.wishlist.repository;

import com.back.teamcoffee.domain.wishlist.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {
    List<WishList> findByEmail(String email);
    
    Optional<WishList> findByEmailAndWishId(String email, Long wishId);
    
    Optional<WishList> findByEmailAndProductId(String email, Long productId);

    void deleteByEmailAndWishId(String email, Long wishId);
}
