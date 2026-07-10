package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.ConsultantUpdateRequest;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ConsultantService {
    private final UserRepository userRepository;

    public List<User> getAllConsultants() {
        return userRepository.findByRole(Role.CONSULTANT);
    }

    public ResponseEntity<?> getConsultantById(Long id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.CONSULTANT)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> notFound("Consultant not found"));
    }

    public ResponseEntity<?> updateConsultant(Long id, ConsultantUpdateRequest request) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.CONSULTANT)
                .<ResponseEntity<?>>map(consultant -> {
                    ResponseEntity<Map<String, String>> emailError = validateEmailChange(consultant, request.getEmail());
                    if (emailError != null) {
                        return emailError;
                    }

                    applyUpdates(consultant, request);
                    return ResponseEntity.ok(userRepository.save(consultant));
                })
                .orElseGet(() -> notFound("Consultant not found"));
    }

    public ResponseEntity<Map<String, String>> deleteConsultant(Long id) {
        return userRepository.findById(id)
                .filter(user -> user.getRole() == Role.CONSULTANT)
                .map(consultant -> {
                    userRepository.delete(consultant);
                    return ResponseEntity.ok(Map.of("message", "Consultant deleted successfully"));
                })
                .orElseGet(() -> notFound("Consultant not found"));
    }

    private void applyUpdates(User consultant, ConsultantUpdateRequest request) {
        if (request.getFirstName() != null) consultant.setFirstName(request.getFirstName());
        if (request.getLastName() != null) consultant.setLastName(request.getLastName());
        if (request.getNic() != null) consultant.setNic(request.getNic());
        if (request.getDob() != null) consultant.setDob(request.getDob());
        if (request.getMobile() != null) consultant.setMobile(request.getMobile());
        if (request.getAddress() != null) consultant.setAddress(request.getAddress());
        if (request.getEmail() != null) consultant.setEmail(request.getEmail());
    }

    private ResponseEntity<Map<String, String>> validateEmailChange(User consultant, String email) {
        if (email == null || email.equals(consultant.getEmail())) {
            return null;
        }
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Email already exists")))
                .orElse(null);
    }

    private ResponseEntity<Map<String, String>> notFound(String message) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", message));
    }
}
