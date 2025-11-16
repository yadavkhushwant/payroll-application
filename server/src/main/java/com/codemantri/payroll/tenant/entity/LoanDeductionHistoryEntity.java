package com.codemantri.payroll.tenant.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "loan_deduction_history")
@Entity
@Data
public class LoanDeductionHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "loan_id", referencedColumnName = "id", nullable = false)
    private EmployeeLoanEntity loan;

    @Column(name = "deduction_month", nullable = false)
    private LocalDate deductionMonth; // First day of the month

    @Column(name = "deducted_amount", precision = 12, scale = 2, nullable = false)
    private BigDecimal deductedAmount;

    @Column(name = "principal_amount", precision = 12, scale = 2)
    private BigDecimal principalAmount;

    @Column(name = "interest_amount", precision = 12, scale = 2)
    private BigDecimal interestAmount;

    @Column(name = "outstanding_before", precision = 12, scale = 2)
    private BigDecimal outstandingBefore;

    @Column(name = "outstanding_after", precision = 12, scale = 2)
    private BigDecimal outstandingAfter;

    @Column(name = "installment_number")
    private Integer installmentNumber;

    @CreationTimestamp
    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    @Column(name = "processed_by")
    private String processedBy;
}
