package com.back.teamcoffee.domain.order.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record OrderWriteReqBody(
    @NotEmpty
    List<@Valid OrderProductReq> products,
    @NotBlank
    @Size(min = 10, max = 100)
    String userEmail,
    @Size(min = 10, max = 300)
    String address
) {}