package com.codemantri.payroll.tenant.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Table(name = "bonus_types")
@Entity
@Data
public class BonusTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type_name", nullable = false, unique = true, length = 100)
    private String typeName; // Performance Bonus, Annual Bonus, Festival Bonus, etc.

    @Column(name = "type_code", nullable = false, unique = true, length = 50)
    private String typeCode; // PERFORMANCE, ANNUAL, FESTIVAL, etc.

    @Column(name = "description")
    private String description;

    @Column(name = "calculation_base", nullable = false)
    @Enumerated(EnumType.STRING)
    private CalculationBase calculationBase; // FIXED_AMOUNT, PERCENTAGE_OF_BASIC, etc.

    @Column(name = "default_percentage", precision = 5, scale = 2)
    private java.math.BigDecimal defaultPercentage;

    @Column(name = "default_amount", precision = 12, scale = 2)
    private java.math.BigDecimal defaultAmount;

    @Column(name = "is_taxable", nullable = false)
    private Boolean isTaxable = true;

    @Column(name = "is_annual", nullable = false)
    private Boolean isAnnual = false; // True for yearly bonuses, false for ad-hoc

    @Column(name = "requires_approval", nullable = false)
    private Boolean requiresApproval = true;

    @Column(name = "requires_performance_rating", nullable = false)
    private Boolean requiresPerformanceRating = false;

    @Column(name = "eligibility_months") // Minimum months of employment required
    private Integer eligibilityMonths;

    @Column(name = "frequency") // MONTHLY, QUARTERLY, YEARLY, AD_HOC
    @Enumerated(EnumType.STRING)
    private BonusFrequency frequency;

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
