package com.codemantri.payroll.tenant.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateSalaryStructureDto {
    private String structureName;
    private String description;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private String createdBy;
}
