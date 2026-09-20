package com.tripflow.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * TravelPackage entity — maps to the `travel_packages` table.
 * A package covers multiple destinations and has a day-wise itinerary.
 */
@Entity
@Table(name = "travel_packages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 300)
    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration_days", nullable = false)
    private Integer durationDays;

    @Column(name = "duration_nights", nullable = false)
    private Integer durationNights;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(precision = 2, scale = 1)
    private Double rating;

    private Integer reviews;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(length = 100)
    private String region;

    @Column(name = "max_travelers")
    private Integer maxTravelers;

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Destination> destinations = new ArrayList<>();

    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ItineraryDay> itinerary = new ArrayList<>();
}
