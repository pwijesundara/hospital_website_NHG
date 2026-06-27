package com.management.galle_hospital.Payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ClinicRequest {
    private String clinicName;
    private String description;
    private List<Long> doctorIds;
}
