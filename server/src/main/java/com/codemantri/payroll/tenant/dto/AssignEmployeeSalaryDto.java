package com.codemantri.payroll.tenant.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AssignEmployeeSalaryDto {
    private Long employeeId;
    private Long salaryStructureId;
    private BigDecimal basicSalary;
    private BigDecimal grossSalary;
    private BigDecimal ctc;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private String revisionReason;
    private String createdBy;
}
