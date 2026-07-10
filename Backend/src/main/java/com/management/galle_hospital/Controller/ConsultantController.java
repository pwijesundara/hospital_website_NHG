package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Model.User;
import com.management.galle_hospital.Payload.ConsultantUpdateRequest;
import com.management.galle_hospital.Service.ConsultantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consultants")
@RequiredArgsConstructor
public class ConsultantController {
    private final ConsultantService consultantService;

    @GetMapping
    public List<User> getAllConsultants() {
        return consultantService.getAllConsultants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getConsultantById(@PathVariable Long id) {
        return consultantService.getConsultantById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateConsultant(@PathVariable Long id, @RequestBody ConsultantUpdateRequest request) {
        return consultantService.updateConsultant(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteConsultant(@PathVariable Long id) {
        return consultantService.deleteConsultant(id);
    }
}
