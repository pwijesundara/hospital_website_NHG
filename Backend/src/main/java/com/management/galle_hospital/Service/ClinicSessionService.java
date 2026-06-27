package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.ClinicSession;
import com.management.galle_hospital.Payload.ClinicSessionRequest;
import com.management.galle_hospital.Repository.ClinicRepository;
import com.management.galle_hospital.Repository.ClinicSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClinicSessionService {
    private final ClinicSessionRepository clinicSessionRepository;
    private final ClinicRepository clinicRepository;

    public List<ClinicSession> getAllClinicSessions() {
        return clinicSessionRepository.findAll();
    }

    public ResponseEntity<?> getClinicSessionById(Long id) {
        return clinicSessionRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> notFound("Clinic session not found"));
    }

    public ResponseEntity<?> createClinicSession(ClinicSessionRequest request) {
        if (request.getClinicId() == null) {
            return error("clinicId is required", HttpStatus.BAD_REQUEST);
        }

        ClinicSession clinicSession = new ClinicSession();
        ResponseEntity<?> clinicError = applyClinic(clinicSession, request.getClinicId());
        if (clinicError != null) {
            return clinicError;
        }

        applyUpdates(clinicSession, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(clinicSessionRepository.save(clinicSession));
    }

    public ResponseEntity<?> updateClinicSession(Long id, ClinicSessionRequest request) {
        return clinicSessionRepository.findById(id)
                .<ResponseEntity<?>>map(clinicSession -> {
                    if (request.getClinicId() != null) {
                        ResponseEntity<?> clinicError = applyClinic(clinicSession, request.getClinicId());
                        if (clinicError != null) {
                            return clinicError;
                        }
                    }

                    applyUpdates(clinicSession, request);
                    return ResponseEntity.ok(clinicSessionRepository.save(clinicSession));
                })
                .orElseGet(() -> notFound("Clinic session not found"));
    }

    public ResponseEntity<Map<String, String>> deleteClinicSession(Long id) {
        if (!clinicSessionRepository.existsById(id)) {
            return notFound("Clinic session not found");
        }
        clinicSessionRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Clinic session deleted successfully"));
    }

    private ResponseEntity<?> applyClinic(ClinicSession clinicSession, Long clinicId) {
        var clinic = clinicRepository.findById(clinicId);
        if (clinic.isEmpty()) {
            return error("Clinic not found", HttpStatus.BAD_REQUEST);
        }
        clinicSession.setClinic(clinic.get());
        return null;
    }

    private void applyUpdates(ClinicSession clinicSession, ClinicSessionRequest request) {
        if (request.getClinicDate() != null) clinicSession.setClinicDate(request.getClinicDate());
        if (request.getStartTime() != null) clinicSession.setStartTime(request.getStartTime());
        if (request.getEndTime() != null) clinicSession.setEndTime(request.getEndTime());
        if (request.getLocation() != null) clinicSession.setLocation(request.getLocation());
        if (request.getMaximumPatients() != null) clinicSession.setMaximumPatients(request.getMaximumPatients());
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private ResponseEntity<Map<String, String>> notFound(String message) {
        return error(message, HttpStatus.NOT_FOUND);
    }
}
