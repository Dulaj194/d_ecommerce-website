package com.ecommerce.service;

import com.ecommerce.dto.HeroBannerRequest;
import com.ecommerce.dto.HeroBannerResponse;
import com.ecommerce.entity.HeroBanner;
import com.ecommerce.repository.HeroBannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HeroBannerService {

    private final HeroBannerRepository heroBannerRepository;

    public List<HeroBannerResponse> getAllActiveBanners() {
        return heroBannerRepository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<HeroBannerResponse> getAllBanners() {
        return heroBannerRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public HeroBannerResponse getBannerById(Long id) {
        HeroBanner banner = heroBannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero banner not found"));
        return toResponse(banner);
    }

    @Transactional
    public HeroBannerResponse createBanner(HeroBannerRequest request) {
        HeroBanner banner = HeroBanner.builder()
                .imageUrl(request.getImageUrl())
                .title(request.getTitle())
                .subtitle(request.getSubtitle())
                .displayOrder(request.getDisplayOrder())
                .isActive(request.getIsActive())
                .build();

        HeroBanner savedBanner = heroBannerRepository.save(banner);
        return toResponse(savedBanner);
    }

    @Transactional
    public HeroBannerResponse updateBanner(Long id, HeroBannerRequest request) {
        HeroBanner banner = heroBannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hero banner not found"));

        banner.setImageUrl(request.getImageUrl());
        banner.setTitle(request.getTitle());
        banner.setSubtitle(request.getSubtitle());
        banner.setDisplayOrder(request.getDisplayOrder());
        banner.setIsActive(request.getIsActive());

        HeroBanner updatedBanner = heroBannerRepository.save(banner);
        return toResponse(updatedBanner);
    }

    @Transactional
    public void deleteBanner(Long id) {
        if (!heroBannerRepository.existsById(id)) {
            throw new RuntimeException("Hero banner not found");
        }
        heroBannerRepository.deleteById(id);
    }

    private HeroBannerResponse toResponse(HeroBanner banner) {
        return HeroBannerResponse.builder()
                .id(banner.getId())
                .imageUrl(banner.getImageUrl())
                .title(banner.getTitle())
                .subtitle(banner.getSubtitle())
                .displayOrder(banner.getDisplayOrder())
                .isActive(banner.getIsActive())
                .createdAt(banner.getCreatedAt())
                .updatedAt(banner.getUpdatedAt())
                .build();
    }
}
