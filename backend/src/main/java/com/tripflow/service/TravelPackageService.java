package com.tripflow.service;

import com.tripflow.model.TravelPackage;
import com.tripflow.repository.TravelPackageRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for TravelPackage operations.
 * Contains business logic for retrieving, searching, and filtering packages.
 */
@Service
public class TravelPackageService {

    private final TravelPackageRepository packageRepository;

    public TravelPackageService(TravelPackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    /**
     * Get all travel packages.
     */
    public List<TravelPackage> getAllPackages() {
        return packageRepository.findAll();
    }

    /**
     * Get a package by its ID.
     */
    public Optional<TravelPackage> getPackageById(Long id) {
        return packageRepository.findById(id);
    }

    /**
     * Search packages by destination name.
     */
    public List<TravelPackage> searchByDestination(String destination) {
        return packageRepository.findByDestinationName(destination);
    }

    /**
     * Filter packages by maximum budget (price).
     */
    public List<TravelPackage> filterByBudget(BigDecimal maxBudget) {
        return packageRepository.findByPriceLessThanEqual(maxBudget);
    }

    /**
     * Search and filter packages by both destination and budget.
     */
    public List<TravelPackage> searchAndFilter(String destination, BigDecimal maxBudget) {
        List<TravelPackage> result = packageRepository.findAll();
        if (destination != null && !destination.isBlank()) {
            result = result.stream()
                    .filter(p -> p.getDestinations().stream()
                            .anyMatch(d -> d.getName().toLowerCase()
                                    .contains(destination.toLowerCase())))
                    .toList();
        }
        if (maxBudget != null) {
            result = result.stream()
                    .filter(p -> p.getPrice().compareTo(maxBudget) <= 0)
                    .toList();
        }
        return result;
    }
}
