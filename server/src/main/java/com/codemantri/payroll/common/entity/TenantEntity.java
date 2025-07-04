package com.codemantri.payroll.common.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tenants")
public class TenantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="tenant_id", unique = true, nullable = false, updatable = false)
    private Long tenantId;
    @Column(name="db_url", nullable = false)
    private String dbUrl;
    @Column(name="username", nullable = false)
    private String username;
    @Column(name="password", nullable = false)
    private String password;
    @Column(name="driver_class_name", nullable = false)
    private String driverClassName;
}
