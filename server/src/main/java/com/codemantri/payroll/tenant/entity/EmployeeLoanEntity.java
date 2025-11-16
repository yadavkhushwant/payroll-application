package com.codemantri.payroll.tenant.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "employee_loans")
@Entity
@Data
public class EmployeeLoanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private EmployeeEntity employee;

    @ManyToOne
    @JoinColumn(name = "loan_type_id", referencedColumnName = "id", nullable = false)
    private LoanTypeEntity loanType;

    @Column(name = "loan_amount", precision = 12, scale = 2, nullable = false)
    private BigDecimal loanAmount;

    @Column(name = "outstanding_amount", precision = 12, scale = 2, nullable = false)
    private BigDecimal outstandingAmount;

    @Column(name = "monthly_deduction", precision = 12, scale = 2)
    private BigDecimal monthlyDeduction;

    @Column(name = "total_installments")
    private Integer totalInstallments;

    @Column(name = "paid_installments", nullable = false)
    private Integer paidInstallments = 0;

    @Column(name = "interest_rate", precision = 5, scale = 2)
    private BigDecimal interestRate;

    @Column(name = "loan_date", nullable = false)
    private LocalDate loanDate;

    @Column(name = "start_deduction_from")
    private LocalDate startDeductionFrom;

    @Column(name = "expected_completion_date")
    private LocalDate expectedCompletionDate;

    @Column(name = "actual_completion_date")
    private LocalDate actualCompletionDate;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private LoanStatus status = LoanStatus.PENDING_APPROVAL;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approval_date")
    private LocalDate approvalDate;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "purpose") // Reason for loan
    private String purpose;

    @Column(name = "guarantor_name")
    private String guarantorName;

    @Column(name = "guarantor_employee_id")
    private Long guarantorEmployeeId;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
