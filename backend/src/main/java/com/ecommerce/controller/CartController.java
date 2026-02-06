package com.ecommerce.controller;

import com.ecommerce.dto.CartItemRequest;
import com.ecommerce.dto.CartItemResponse;
import com.ecommerce.dto.CartResponse;
import com.ecommerce.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getCart(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.getCart(email));
    }

    @PostMapping("/items")
    public ResponseEntity<CartItemResponse> addToCart(
            Authentication authentication,
            @Valid @RequestBody CartItemRequest request
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.addToCart(email, request));
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<CartItemResponse> updateCartItem(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody CartItemRequest request
    ) {
        String email = authentication.getName();
        return ResponseEntity.ok(cartService.updateCartItem(email, id, request));
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> removeCartItem(
            Authentication authentication,
            @PathVariable Long id
    ) {
        String email = authentication.getName();
        cartService.removeCartItem(email, id);
        return ResponseEntity.noContent().build();
    }
}
