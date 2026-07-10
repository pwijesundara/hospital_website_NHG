package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Doctor;
import com.management.galle_hospital.Model.Patient;
import com.management.galle_hospital.Model.PasswordResetToken;
import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.ConsultantRegistrationRequest;
import com.management.galle_hospital.Payload.DoctorRegistrationRequest;
import com.management.galle_hospital.Payload.ForgotPasswordRequest;
import com.management.galle_hospital.Payload.LabRegistrationRequest;
import com.management.galle_hospital.Payload.NurseRegistrationRequest;
import com.management.galle_hospital.Payload.PatientRegistrationRequest;
import com.management.galle_hospital.Payload.ResetPasswordRequest;
import com.management.galle_hospital.Payload.UserLoginRequest;
import com.management.galle_hospital.Payload.UserRegisterRequest;
import com.management.galle_hospital.Repository.DoctorRepository;
import com.management.galle_hospital.Repository.PatientRepository;
import com.management.galle_hospital.Repository.PasswordResetTokenRepository;
import com.management.galle_hospital.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.password-reset.token-expiration-minutes:15}")
    private long passwordResetExpirationMinutes;

    @Value("${app.frontend.reset-password-url:http://localhost:3000/reset-password}")
    private String resetPasswordUrl;

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

    public ResponseEntity<Map<String, String>> registerLab(LabRegistrationRequest request) {
        String validationError = validateRegistration(request.getEmail(), request.getPassword(), request.getConfirmPassword(), request.getMobile());
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        User lab = buildStaffUser(request.getFirstName(), request.getLastName(), request.getNic(), request.getDob(),
                request.getMobile(), request.getAddress(), request.getEmail(), request.getPassword(), Role.LAB);

        User savedLab = userRepository.save(lab);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Lab registered successfully", "id", savedLab.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> registerConsultant(ConsultantRegistrationRequest request) {
        String validationError = validateRegistration(request.getEmail(), request.getPassword(), request.getConfirmPassword(), request.getMobile());
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        User consultant = buildStaffUser(request.getFirstName(), request.getLastName(), request.getNic(), request.getDob(),
                request.getMobile(), request.getAddress(), request.getEmail(), request.getPassword(), Role.CONSULTANT);

        User savedConsultant = userRepository.save(consultant);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Consultant registered successfully", "id", savedConsultant.getId().toString()));
    }

    public ResponseEntity<Map<String, String>> registerNurse(NurseRegistrationRequest request) {
        String validationError = validateRegistration(request.getEmail(), request.getPassword(), request.getConfirmPassword(), request.getMobile());
        if (validationError != null) {
            return error(validationError, HttpStatus.BAD_REQUEST);
        }

        User nurse = buildStaffUser(request.getFirstName(), request.getLastName(), request.getNic(), request.getDob(),
                request.getMobile(), request.getAddress(), request.getEmail(), request.getPassword(), Role.NURSE);

        User savedNurse = userRepository.save(nurse);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Nurse registered successfully", "id", savedNurse.getId().toString()));
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

    public ResponseEntity<Map<String, String>> forgotPassword(ForgotPasswordRequest request) {
        if (request == null || isBlank(request.getEmail())) {
            return error("Email is required", HttpStatus.BAD_REQUEST);
        }

        userRepository.findByEmail(request.getEmail().trim()).ifPresent(user -> {
            String token = generateResetToken();

            PasswordResetToken passwordResetToken = new PasswordResetToken();
            passwordResetToken.setToken(token);
            passwordResetToken.setUser(user);
            passwordResetToken.setExpiresAt(LocalDateTime.now().plusMinutes(passwordResetExpirationMinutes));
            passwordResetTokenRepository.save(passwordResetToken);

            String resetLink = resetPasswordUrl + "?token=" + token;
            emailService.sendPasswordResetEmail(user.getEmail(), resetLink, token);
        });

        return ResponseEntity.ok(Map.of("message", "If the email exists, a password reset email has been sent"));
    }

    @Transactional
    public ResponseEntity<Map<String, String>> resetPassword(ResetPasswordRequest request) {
        if (request == null || isBlank(request.getToken()) || isBlank(request.getNewPassword()) || isBlank(request.getConfirmPassword())) {
            return error("Token, newPassword and confirmPassword are required", HttpStatus.BAD_REQUEST);
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return error("Password and confirmPassword do not match", HttpStatus.BAD_REQUEST);
        }

        return passwordResetTokenRepository.findByToken(request.getToken().trim())
                .map(passwordResetToken -> {
                    if (passwordResetToken.getUsedAt() != null) {
                        return error("Password reset token has already been used", HttpStatus.BAD_REQUEST);
                    }
                    if (passwordResetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
                        return error("Password reset token has expired", HttpStatus.BAD_REQUEST);
                    }

                    User user = passwordResetToken.getUser();
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    userRepository.save(user);

                    passwordResetToken.setUsedAt(LocalDateTime.now());
                    passwordResetTokenRepository.save(passwordResetToken);

                    return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
                })
                .orElseGet(() -> error("Invalid password reset token", HttpStatus.BAD_REQUEST));
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

    private User buildStaffUser(String firstName, String lastName, String nic, java.time.LocalDate dob, String mobile,
                                String address, String email, String password, Role role) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setNic(nic);
        user.setDob(dob);
        user.setMobile(mobile);
        user.setAddress(address);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return user;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private String generateResetToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
