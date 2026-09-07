package com.management.galle_hospital.Service;

import com.management.galle_hospital.Model.Role;
import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.PatientRegistrationRequest;
import com.management.galle_hospital.Payload.UserLoginRequest;
import com.management.galle_hospital.Repository.DoctorRepository;
import com.management.galle_hospital.Repository.PasswordResetTokenRepository;
import com.management.galle_hospital.Repository.PatientRepository;
import com.management.galle_hospital.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

/**
 * Unit test for {@link UserService}.
 *
 * "Unit" test = we test ONE class in isolation. The database, email server, etc.
 * are replaced by Mockito fakes ("mocks"), so this test runs in milliseconds and
 * needs no MySQL/H2 running.
 *
 * {@code @ExtendWith(MockitoExtension.class)} tells JUnit 5 to let Mockito process
 * the {@code @Mock} annotations before each test method.
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    // Each @Mock is a stand-in object. By default every method on it returns a
    // "empty" value (null, empty Optional, empty list, 0, false) until we say otherwise.
    // UserService's constructor needs all five of these, so we declare all five.
    @Mock private UserRepository userRepository;
    @Mock private PatientRepository patientRepository;
    @Mock private DoctorRepository doctorRepository;
    @Mock private PasswordResetTokenRepository passwordResetTokenRepository;
    @Mock private EmailService emailService;

    /** Small helper so every test builds the class under test the same way. */
    private UserService newUserService() {
        // Hand the real object the mocks instead of real repositories.
        // (passwordEncoder / secureRandom are created inside UserService itself,
        // so they are not constructor arguments.)
        return new UserService(
                userRepository, patientRepository, doctorRepository,
                passwordResetTokenRepository, emailService);
    }

    // ---------------------------------------------------------------------
    // TEST CASE 1 — Login with a wrong / unknown email is rejected (HTTP 401)
    // ---------------------------------------------------------------------
    @Test
    void login_returns401_whenEmailIsNotRegistered() {
        // ---------- Arrange: set up the scenario ----------
        UserService userService = newUserService();

        // Teach the mock how to behave for THIS test:
        // "when someone asks the repository for this email, say there is no such user."
        when(userRepository.findByEmail("ghost@example.com"))
                .thenReturn(Optional.empty());

        // The input the caller would send.
        UserLoginRequest request = new UserLoginRequest();
        request.setEmail("ghost@example.com");
        request.setPassword("whatever123");

        // ---------- Act: call the method we are testing ----------
        ResponseEntity<Map<String, String>> response = userService.login(request);

        // ---------- Assert: verify the outcome ----------
        // An unknown email must be rejected with HTTP 401 and a generic message
        // (generic on purpose: we must not reveal whether the email exists).
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(response.getBody()).containsEntry("message", "Invalid email or password");
    }

    // ---------------------------------------------------------------------
    // TEST CASE 2 — Login with the correct email + password succeeds (HTTP 200)
    //               and returns the user's id and role to the frontend.
    // ---------------------------------------------------------------------
    @Test
    void login_returns200WithIdAndRole_whenCredentialsAreCorrect() {
        // ---------- Arrange ----------
        UserService userService = newUserService();

        // A user that already exists in the "database". The stored password is
        // BCrypt-hashed, exactly like a real row would be.
        String rawPassword = "Nurse12345";
        User storedUser = new User();
        storedUser.setId(42L);
        storedUser.setEmail("nurse@example.com");
        storedUser.setPassword(new BCryptPasswordEncoder().encode(rawPassword));
        storedUser.setRole(Role.NURSE);

        when(userRepository.findByEmail("nurse@example.com"))
                .thenReturn(Optional.of(storedUser));

        // The caller sends the CORRECT raw password.
        UserLoginRequest request = new UserLoginRequest();
        request.setEmail("nurse@example.com");
        request.setPassword(rawPassword);

        // ---------- Act ----------
        ResponseEntity<Map<String, String>> response = userService.login(request);

        // ---------- Assert ----------
        // Correct credentials -> HTTP 200 and a body carrying the id + role that
        // the frontend uses to decide which dashboard to show.
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsEntry("message", "Login successful");
        assertThat(response.getBody()).containsEntry("id", "42");
        assertThat(response.getBody()).containsEntry("role", "NURSE");
    }

    // ---------------------------------------------------------------------
    // TEST CASE 3 — Patient registration is refused when the password is too
    //               short, and nothing is written to the database.
    // ---------------------------------------------------------------------
    @Test
    void registerPatient_returns400_whenPasswordIsTooShort() {
        // ---------- Arrange ----------
        UserService userService = newUserService();

        // No existing account uses this email, so the only thing that can fail
        // is the password rule we are testing.
        when(userRepository.findByEmailIgnoreCase("john@example.com"))
                .thenReturn(Optional.empty());

        PatientRegistrationRequest request = new PatientRegistrationRequest();
        request.setFirstName("John");
        request.setMobile("0771234567");
        request.setEmail("john@example.com");
        request.setPassword("abc12");          // 5 characters — below the 8 minimum
        request.setConfirmPassword("abc12");

        // ---------- Act ----------
        ResponseEntity<Map<String, String>> response = userService.registerPatient(request);

        // ---------- Assert ----------
        // The request is rejected with HTTP 400 and a clear message...
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).containsEntry("message", "Password must be at least 8 characters");
        // ...and no patient row was ever saved.
        verifyNoInteractions(patientRepository);
    }
}
