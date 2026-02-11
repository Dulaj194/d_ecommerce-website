package com.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HeroBannerRequest {
    
    @NotBlank(message = "Image URL is required")
    private String imageUrl;
    
    private String title;
    
    private String subtitle;
    
    @NotNull(message = "Display order is required")
    private Integer displayOrder;
    
    @NotNull(message = "Active status is required")
    private Boolean isActive;
}
