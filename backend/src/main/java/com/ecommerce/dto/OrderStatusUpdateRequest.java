package com.ecommerce.dto;

import com.ecommerce.entity.Order;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatusUpdateRequest {
    
    @NotNull(message = "Status is required")
    private Order.OrderStatus status;
}
