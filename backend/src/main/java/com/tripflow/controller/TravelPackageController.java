package com.tripflow.controller;

import com.tripflow.model.TravelPackage;
import com.tripflow.service.TravelPackageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * REST Controller for TravelPackage operations.
 * Base path: /api/packages
 */
@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "http://localhost:5173")
public class TravelPackageController {

    private final TravelPackageService packageService;

    public TravelPackageController(TravelPackageService packageService) {
        this.packageService = packageService;
    }

    /**
     * Get all travel packages.
     * GET /api/packages
     */
    @GetMapping
    public ResponseEntity<List<TravelPackage>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    /**
     * Get a package by ID.
     * GET /api/packages/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<TravelPackage> getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Search and filter packages.
     * GET /api/packages/search?destination=Goa&maxBudget=20000
     */
    @GetMapping("/search")
    public ResponseEntity<List<TravelPackage>> searchPackages(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) BigDecimal maxBudget) {

        List<TravelPackage> results = packageService.searchAndFilter(destination, maxBudget);
        return ResponseEntity.ok(results);
    }
}
