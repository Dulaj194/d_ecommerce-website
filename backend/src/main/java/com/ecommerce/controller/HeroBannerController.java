package com.ecommerce.controller;

import com.ecommerce.dto.HeroBannerRequest;
import com.ecommerce.dto.HeroBannerResponse;
import com.ecommerce.service.HeroBannerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HeroBannerController {

    private final HeroBannerService heroBannerService;

    @GetMapping("/hero-banners")
    public ResponseEntity<List<HeroBannerResponse>> getActiveBanners() {
        return ResponseEntity.ok(heroBannerService.getAllActiveBanners());
    }

    @GetMapping("/admin/hero-banners")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<HeroBannerResponse>> getAllBanners() {
        return ResponseEntity.ok(heroBannerService.getAllBanners());
    }

    @GetMapping("/admin/hero-banners/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HeroBannerResponse> getBannerById(@PathVariable Long id) {
        return ResponseEntity.ok(heroBannerService.getBannerById(id));
    }

    @PostMapping("/admin/hero-banners")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HeroBannerResponse> createBanner(@Valid @RequestBody HeroBannerRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(heroBannerService.createBanner(request));
    }

    @PutMapping("/admin/hero-banners/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HeroBannerResponse> updateBanner(
            @PathVariable Long id,
            @Valid @RequestBody HeroBannerRequest request) {
        return ResponseEntity.ok(heroBannerService.updateBanner(id, request));
    }

    @DeleteMapping("/admin/hero-banners/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBanner(@PathVariable Long id) {
        heroBannerService.deleteBanner(id);
        return ResponseEntity.noContent().build();
    }
}
