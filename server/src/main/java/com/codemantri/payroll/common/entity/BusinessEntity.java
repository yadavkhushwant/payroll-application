package com.codemantri.payroll.common.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "businesses")
public class BusinessEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="tenant_id", unique = true, nullable = false, updatable = false)
    private Long tenantId;

    @Column(name="business_name", nullable = false)
    private String businessName;

    @Column(name="address", nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name="contact_name", nullable = false)
    private String contactName;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="phone", nullable = false)
    private String phone;

    @Column(name="pan_number")
    private String panNumber;

    @Column(name="gst_number")
    private String gstNumber;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "is_setup_completed", nullable = false)
    private boolean isSetupCompleted = false;

    @Column(name = "setup_completed_at")
    private LocalDateTime setupCompletedAt;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @PrePersist
    private void generateTenantId() {
        if (this.tenantId == null) {
            this.tenantId = (long) Math.abs(UUID.randomUUID().toString().hashCode());
        }
    }
}
