package com.codemantri.payroll.common.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "role_permissions", uniqueConstraints = {@UniqueConstraint(columnNames = {"role_id", "permission_id"})})
public class RolePermissionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // Automatically delete mappings when role is deleted
    private RoleEntity role;

    @ManyToOne
    @JoinColumn(name = "permission_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // Automatically delete mappings when permission is deleted
    private PermissionEntity permission;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}