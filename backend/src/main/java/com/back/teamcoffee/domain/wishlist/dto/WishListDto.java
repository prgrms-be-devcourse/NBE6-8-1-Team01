package com.back.teamcoffee.domain.wishlist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishListDto {

    private long wishId;

    private long productId;

    private String productName;

    private int productPrice;

    private String email;
}
