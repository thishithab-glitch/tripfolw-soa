package com.tripflow.service;

import com.tripflow.model.User;
import com.tripflow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service layer for User operations.
 * Contains business logic for registration and login.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Register a new user.
     * @param user the user to register
     * @return the saved user
     * @throws IllegalArgumentException if email is already registered
     */
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + user.getEmail());
        }
        return userRepository.save(user);
    }

    /**
     * Authenticate a user by email and password.
     * NOTE: This is a simple plaintext check for the MVP.
     * In production, use BCrypt or similar password hashing.
     * @param email the user's email
     * @param password the user's password
     * @return the authenticated user if credentials match
     */
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }

    /**
     * Get a user by ID.
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
