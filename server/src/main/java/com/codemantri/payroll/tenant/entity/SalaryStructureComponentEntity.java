package com.codemantri.payroll.tenant.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Table(name = "salary_structure_components")
@Entity
@Data
public class SalaryStructureComponentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "salary_structure_id", referencedColumnName = "id", nullable = false)
    private SalaryStructureEntity salaryStructure;

    @ManyToOne
    @JoinColumn(name = "component_id", referencedColumnName = "id", nullable = false)
    private SalaryComponentEntity component;

    @Column(name = "component_value", precision = 10, scale = 2)
    private BigDecimal componentValue;

    @Column(name = "is_percentage", nullable = false)
    private Boolean isPercentage = false;

    @Column(name = "percentage_base")
    @Enumerated(EnumType.STRING)
    private PercentageBase percentageBase; // BASIC, GROSS, CTC

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "created_by")
    private String createdBy;
}
