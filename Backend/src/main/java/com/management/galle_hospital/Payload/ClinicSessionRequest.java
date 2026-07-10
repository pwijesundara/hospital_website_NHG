package com.management.galle_hospital.Payload;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ClinicSessionRequest {
    private Long clinicId;
    private Long consultantId;
    private LocalDate clinicDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String location;
    private String description;
    private Integer maximumPatients;
}
