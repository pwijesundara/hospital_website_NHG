package com.management.galle_hospital.Controller;

import com.management.galle_hospital.Model.AppointmentStatus;
import com.management.galle_hospital.Payload.AppointmentRequestCreateRequest;
import com.management.galle_hospital.Payload.AppointmentRequestResponse;
import com.management.galle_hospital.Service.AppointmentRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentRequestController {
    private final AppointmentRequestService appointmentRequestService;

    @PostMapping("/requests")
    public ResponseEntity<?> createAppointmentRequest(@RequestBody AppointmentRequestCreateRequest request) {
        return appointmentRequestService.createAppointmentRequest(request);
    }

    @GetMapping("/patients/{patientId}/requests")
    public List<AppointmentRequestResponse> getRequestsByPatient(@PathVariable Long patientId) {
        return appointmentRequestService.getRequestsByPatient(patientId);
    }

    @GetMapping("/consultants/{consultantId}/requests")
    public ResponseEntity<?> getRequestsByConsultant(
            @PathVariable Long consultantId,
            @RequestParam(required = false) AppointmentStatus status
    ) {
        return appointmentRequestService.getRequestsByConsultant(consultantId, status);
    }

    @PatchMapping("/requests/{requestId}/accept")
    public ResponseEntity<?> acceptRequest(@PathVariable Long requestId, @RequestParam Long consultantId) {
        return appointmentRequestService.acceptRequest(requestId, consultantId);
    }

    @PatchMapping("/requests/{requestId}/remove")
    public ResponseEntity<?> removeRequest(@PathVariable Long requestId, @RequestParam Long consultantId) {
        return appointmentRequestService.removeRequest(requestId, consultantId);
    }
}
