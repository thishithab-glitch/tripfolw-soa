package com.tripflow.repository;

import com.tripflow.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for Booking entities.
 * Provides methods to query bookings by user.
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * Find all bookings for a given user, ordered by creation date descending.
     */
    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);
}
