package com.codemantri.payroll.tenant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Table(name = "employees")
@Entity
@Data
public class EmployeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "employee_code", unique = true, nullable = false)
    private Long employeeCode;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore             // 👈 This prevents serialization of the user object
    private UserEntity user;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id", nullable = false)
    private DepartmentEntity department;

    @ManyToOne
    @JoinColumn(name = "designation_id", referencedColumnName = "id", nullable = false)
    private DesignationEntity designation;

    @Column(name = "aadhar_number")
    private String aadharNumber;

    @Column(name = "pan_number")
    private String panNumber;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "street")
    private String street;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
