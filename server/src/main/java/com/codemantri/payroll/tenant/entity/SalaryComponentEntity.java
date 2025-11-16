package com.codemantri.payroll.tenant.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Table(name = "salary_components")
@Entity
@Data
public class SalaryComponentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "component_name", nullable = false, length = 100)
    private String componentName;

    @Column(name = "component_code", nullable = false, unique = true, length = 50)
    private String componentCode;

    @Column(name = "component_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ComponentType componentType; // EARNING, DEDUCTION

    @Column(name = "calculation_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private CalculationType calculationType; // FIXED, PERCENTAGE, FORMULA

    @Column(name = "is_taxable", nullable = false)
    private Boolean isTaxable = true;

    @Column(name = "is_statutory", nullable = false)
    private Boolean isStatutory = false; // For PF, ESI, PT, etc.

    @Column(name = "default_value", precision = 10, scale = 2)
    private BigDecimal defaultValue;

    @Column(name = "formula", columnDefinition = "TEXT")
    private String formula; // For complex calculations

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
