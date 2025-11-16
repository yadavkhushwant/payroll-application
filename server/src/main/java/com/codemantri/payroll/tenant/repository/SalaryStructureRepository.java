package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.SalaryStructureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SalaryStructureRepository extends JpaRepository<SalaryStructureEntity, Long> {
    
    @Query("FROM SalaryStructureEntity s WHERE s.isActive = true")
    List<SalaryStructureEntity> findAllActive();
    
    @Query("FROM SalaryStructureEntity s WHERE s.structureName = :name AND s.isActive = true")
    Optional<SalaryStructureEntity> findByNameAndActive(@Param("name") String name);
    
    @Query("FROM SalaryStructureEntity s WHERE :date BETWEEN s.effectiveFrom AND COALESCE(s.effectiveTo, :date) AND s.isActive = true")
    List<SalaryStructureEntity> findActiveOnDate(@Param("date") LocalDate date);
}
