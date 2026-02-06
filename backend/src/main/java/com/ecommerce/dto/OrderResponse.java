package com.ecommerce.dto;

import com.ecommerce.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private Long id;
    private Long userId;
    private String userName;
    private BigDecimal totalAmount;
    private Order.OrderStatus status;
    private String paymentMethod;
    private Order.PaymentStatus paymentStatus;
    private String address;
    private String phone;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;
}
