package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    @Query("SELECT MAX(e.employeeCode) FROM EmployeeEntity e")
    Long findMaxEmployeeCode();

    Optional<EmployeeEntity> findByEmployeeCode(Long employeeCode);
}
