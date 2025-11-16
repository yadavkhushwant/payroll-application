package com.codemantri.payroll.tenant.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Table(name = "loan_types")
@Entity
@Data
public class LoanTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type_name", nullable = false, unique = true, length = 100)
    private String typeName; // Salary Advance, Personal Loan, Emergency Loan, etc.

    @Column(name = "type_code", nullable = false, unique = true, length = 50)
    private String typeCode; // SALARY_ADVANCE, PERSONAL_LOAN, etc.

    @Column(name = "description")
    private String description;

    @Column(name = "max_amount_allowed", precision = 12, scale = 2)
    private java.math.BigDecimal maxAmountAllowed;

    @Column(name = "max_installments")
    private Integer maxInstallments;

    @Column(name = "default_interest_rate", precision = 5, scale = 2)
    private java.math.BigDecimal defaultInterestRate;

    @Column(name = "requires_approval", nullable = false)
    private Boolean requiresApproval = true;

    @Column(name = "is_advance_type", nullable = false)
    private Boolean isAdvanceType = false; // True for salary advance, false for loans

    @Column(name = "eligibility_months") // Minimum months of employment required
    private Integer eligibilityMonths;

    @Column(name = "max_outstanding_loans") // Max number of active loans of this type
    private Integer maxOutstandingLoans = 1;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_by")
    private String updatedBy;
}
