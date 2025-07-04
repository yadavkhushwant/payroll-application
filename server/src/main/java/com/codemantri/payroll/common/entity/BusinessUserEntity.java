package com.codemantri.payroll.common.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Table(name = "business_users")
@Entity
@Data
public class BusinessUserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name= "email", unique = true)
    private String email;

    @Column(name= "phone", unique = true)
    private String phone;

    @Column(name= "tenant_id")
    private Long tenantId;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
