package com.tripflow.repository;

import com.tripflow.model.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Spring Data JPA repository for TravelPackage entities.
 * Provides custom queries for searching and filtering packages.
 */
@Repository
public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {

    /**
     * Find packages containing a destination name (case-insensitive).
     */
    @Query("SELECT DISTINCT p FROM TravelPackage p JOIN p.destinations d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :destination, '%'))")
    List<TravelPackage> findByDestinationName(@Param("destination") String destination);

    /**
     * Find packages with price less than or equal to maxBudget.
     */
    List<TravelPackage> findByPriceLessThanEqual(BigDecimal maxBudget);

    /**
     * Find packages by region.
     */
    List<TravelPackage> findByRegionContainingIgnoreCase(String region);
}
