package com.back.teamcoffee.domain.order.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderStatusUpdateDto(
    @NotNull(message = "주문 ID는 필수입니다.")
    Long orderId,
    
    @NotBlank(message = "주문 상태는 필수입니다.")
    String orderStatus
) {
}