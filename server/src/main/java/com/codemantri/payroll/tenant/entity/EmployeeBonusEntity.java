package com.codemantri.payroll.tenant.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Table(name = "employee_bonuses")
@Entity
@Data
public class EmployeeBonusEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private EmployeeEntity employee;

    @ManyToOne
    @JoinColumn(name = "bonus_type_id", referencedColumnName = "id", nullable = false)
    private BonusTypeEntity bonusType;

    @Column(name = "bonus_amount", precision = 12, scale = 2, nullable = false)
    private BigDecimal bonusAmount;

    @Column(name = "calculation_base")
    @Enumerated(EnumType.STRING)
    private CalculationBase calculationBase;

    @Column(name = "percentage_value", precision = 5, scale = 2)
    private BigDecimal percentageValue;

    @Column(name = "bonus_period_from")
    private LocalDate bonusPeriodFrom;

    @Column(name = "bonus_period_to")
    private LocalDate bonusPeriodTo;

    @Column(name = "eligible_date", nullable = false)
    private LocalDate eligibleDate;

    @Column(name = "payout_month", nullable = false)
    private LocalDate payoutMonth; // Month in which bonus will be paid

    @Column(name = "is_taxable", nullable = false)
    private Boolean isTaxable = true;

    @Column(name = "performance_rating")
    private String performanceRating; // A, B, C, D for performance bonus

    @Column(name = "performance_score", precision = 5, scale = 2)
    private BigDecimal performanceScore; // Numerical score

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private BonusStatus status = BonusStatus.PENDING;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approval_date")
    private LocalDate approvalDate;

    @Column(name = "paid_date")
    private LocalDate paidDate;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "justification") // Reason for bonus
    private String justification;

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
