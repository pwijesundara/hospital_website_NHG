package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Doctor;
import com.management.galle_hospital.Model.Patient;
import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.DoctorRegistrationRequest;
import com.management.galle_hospital.Payload.PatientRegistrationRequest;
import com.management.galle_hospital.Payload.UserLoginRequest;
import com.management.galle_hospital.Payload.UserRegisterRequest;
import com.management.galle_hospital.Repository.DoctorRepository;
import com.management.galle_hospital.Repository.PatientRepository;
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
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<Map<String, String>> register(UserRegisterRequest request) {
        PatientRegistrationRequest patientRequest = new PatientRegistrationRequest();
        patientRequest.setFirstName(request.getName());
        patientRequest.setEmail(request.getEmail());
        patientRequest.setPassword(request.getPassword());
        patientRequest.setConfirmPassword(request.getPassword());
        patientRequest.setMobile("N/A");
        return registerPatient(patientRequest);
    }

    public ResponseEntity<Map<String, String>> registerPatient(PatientRegistrationRequest request) {
        String validationError = validateRegistration(request.getEmail(), request.getPassword(), request.getConfirmPassword(), request.getMobile());
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        Patient patient = new Patient();
        patient.setFirstName(request.getFirstName());
        patient.setLastName(request.getLastName());
        patient.setNic(request.getNic());
        patient.setDob(request.getDob());
        patient.setMobile(request.getMobile());
        patient.setAddress(request.getAddress());
        patient.setEmail(request.getEmail());
        patient.setPassword(passwordEncoder.encode(request.getPassword()));
        patient.setRole(Role.PATIENT);

        Patient savedPatient = patientRepository.save(patient);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Patient registered successfully", "id", savedPatient.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> registerDoctor(DoctorRegistrationRequest request) {
        String validationError = validateRegistration(request.getEmail(), request.getPassword(), request.getConfirmPassword(), request.getMobile());
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        Doctor doctor = new Doctor();
        doctor.setFirstName(request.getFirstName());
        doctor.setLastName(request.getLastName());
        doctor.setNic(request.getNic());
        doctor.setDob(request.getDob());
        doctor.setMobile(request.getMobile());
        doctor.setAddress(request.getAddress());
        doctor.setEmail(request.getEmail());
        doctor.setPassword(passwordEncoder.encode(request.getPassword()));
        doctor.setRole(Role.DOCTOR);
        doctor.setTitle(request.getTitle());
        doctor.setProfilePhoto(request.getProfilePhoto());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setDepartment(request.getDepartment());
        doctor.setQualification(request.getQualification());

        Doctor savedDoctor = doctorRepository.save(doctor);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Doctor registered successfully", "id", savedDoctor.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> login(UserLoginRequest request) {
        if (isBlank(request.getEmail()) || isBlank(request.getPassword())) {
            return error("Email and password are required", HttpStatus.BAD_REQUEST);
        }

        return userRepository.findByEmail(request.getEmail())
                .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()))
                .map(user -> ResponseEntity.ok(Map.of(
                        "message", "Login successful",
                        "id", user.getId().toString(),
                        "role", user.getRole().name()
                )))
                .orElseGet(() -> error("Invalid email or password", HttpStatus.UNAUTHORIZED));
    }

    private String validateRegistration(String email, String password, String confirmPassword, String mobile) {
        if (isBlank(email) || isBlank(password) || isBlank(confirmPassword) || isBlank(mobile)) {
            return "Email, password, confirmPassword and mobile are required";
        }
        if (!password.equals(confirmPassword)) {
            return "Password and confirmPassword do not match";
        }
        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already exists";
        }
        return null;
    }

    private ResponseEntity<Map<String, String>> error(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
