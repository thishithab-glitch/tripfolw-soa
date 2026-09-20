package com.tripflow.service;

import com.tripflow.model.Booking;
import com.tripflow.model.TravelPackage;
import com.tripflow.model.User;
import com.tripflow.repository.BookingRepository;
import com.tripflow.repository.TravelPackageRepository;
import com.tripflow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for Booking operations.
 * Contains business logic for creating, retrieving, and cancelling bookings.
 */
@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TravelPackageRepository packageRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          TravelPackageRepository packageRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.packageRepository = packageRepository;
        this.userRepository = userRepository;
    }

    /**
     * Create a new booking.
     * Validates user and package existence, calculates total price.
     * @param booking the booking to create (must have userId and packageId set via relations)
     * @return the saved booking
     * @throws IllegalArgumentException if user or package not found
     */
    public Booking createBooking(Booking booking) {
        // Validate user exists
        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Validate package exists
        TravelPackage pkg = packageRepository.findById(booking.getTravelPackage().getId())
                .orElseThrow(() -> new IllegalArgumentException("Travel package not found"));

        // Calculate total price if not set
        if (booking.getTotalPrice() == null || booking.getTotalPrice().compareTo(BigDecimal.ZERO) == 0) {
            BigDecimal total = pkg.getPrice().multiply(BigDecimal.valueOf(booking.getNumTravelers()));
            booking.setTotalPrice(total);
        }

        // Validate traveler count
        if (booking.getNumTravelers() < 1) {
            throw new IllegalArgumentException("Number of travelers must be at least 1");
        }
        if (pkg.getMaxTravelers() != null && booking.getNumTravelers() > pkg.getMaxTravelers()) {
            throw new IllegalArgumentException(
                    "Number of travelers exceeds maximum allowed (" + pkg.getMaxTravelers() + ")");
        }

        booking.setUser(user);
        booking.setTravelPackage(pkg);
        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    /**
     * Get all bookings for a user.
     */
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Get a booking by ID.
     */
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    /**
     * Cancel a booking (set status to CANCELLED).
     * @throws IllegalArgumentException if booking not found
     */
    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found with id: " + id));

        if ("CANCELLED".equals(booking.getStatus())) {
            throw new IllegalStateException("Booking is already cancelled");
        }

        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }
}
