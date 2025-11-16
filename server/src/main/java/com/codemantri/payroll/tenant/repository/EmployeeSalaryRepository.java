package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.EmployeeSalaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmployeeSalaryRepository extends JpaRepository<EmployeeSalaryEntity, Long> {
    
    @Query("FROM EmployeeSalaryEntity es WHERE es.employee.id = :employeeId AND es.isActive = true ORDER BY es.effectiveFrom DESC")
    List<EmployeeSalaryEntity> findByEmployeeIdAndActive(@Param("employeeId") Long employeeId);
    
    @Query("FROM EmployeeSalaryEntity es WHERE es.employee.id = :employeeId AND :date BETWEEN es.effectiveFrom AND COALESCE(es.effectiveTo, :date) AND es.isActive = true")
    Optional<EmployeeSalaryEntity> findCurrentSalary(@Param("employeeId") Long employeeId, @Param("date") LocalDate date);
    
    @Query("FROM EmployeeSalaryEntity es WHERE es.employee.id = :employeeId AND es.isActive = true ORDER BY es.effectiveFrom DESC")
    Optional<EmployeeSalaryEntity> findLatestSalaryByEmployeeId(@Param("employeeId") Long employeeId);
    
    @Query("FROM EmployeeSalaryEntity es WHERE es.salaryStructure.id = :structureId AND es.isActive = true")
    List<EmployeeSalaryEntity> findBySalaryStructureIdAndActive(@Param("structureId") Long structureId);
}
