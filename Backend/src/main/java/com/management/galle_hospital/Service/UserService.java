package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.UserLoginRequest;
import com.management.galle_hospital.Payload.UserRegisterRequest;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<Map<String, String>> register(UserRegisterRequest request) {
        if (request == null) {
            return error("Register request body is required", HttpStatus.BAD_REQUEST);
        }

        if (isBlank(request.getName())) {
            return error("Name is required", HttpStatus.BAD_REQUEST);
        }

        if (isBlank(request.getEmail())) {
            return error("Email is required", HttpStatus.BAD_REQUEST);
        }

        if (isBlank(request.getPassword())) {
            return error("Password is required", HttpStatus.BAD_REQUEST);
        }

        if (request.getPassword().length() < 8) {
            return error("Password must have at least 8 characters", HttpStatus.BAD_REQUEST);
        }

        String email = normalizeEmail(request.getEmail());
        if (userRepository.findByEmail(email).isPresent()) {
            return error("User already registered with this email", HttpStatus.CONFLICT);
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return success("User registered successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<Map<String, String>> login(UserLoginRequest request) {
        if (request == null) {
            return error("Login request body is required", HttpStatus.BAD_REQUEST);
        }

        if (isBlank(request.getEmail())) {
            return error("Email is required", HttpStatus.BAD_REQUEST);
        }

        if (isBlank(request.getPassword())) {
            return error("Password is required", HttpStatus.BAD_REQUEST);
        }

        return userRepository.findByEmail(normalizeEmail(request.getEmail()))
                .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> success("Login successful", HttpStatus.OK))
                .orElseGet(() -> error("Invalid email or password", HttpStatus.UNAUTHORIZED));
    }

    private ResponseEntity<Map<String, String>> success(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("error", message));
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
