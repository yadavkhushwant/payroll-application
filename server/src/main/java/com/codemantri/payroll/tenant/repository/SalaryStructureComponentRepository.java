package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.SalaryStructureComponentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SalaryStructureComponentRepository extends JpaRepository<SalaryStructureComponentEntity, Long> {
    
    @Query("FROM SalaryStructureComponentEntity ssc WHERE ssc.salaryStructure.id = :structureId AND ssc.isActive = true ORDER BY ssc.component.displayOrder")
    List<SalaryStructureComponentEntity> findBySalaryStructureIdAndActiveOrderByDisplayOrder(@Param("structureId") Long structureId);
    
    @Query("FROM SalaryStructureComponentEntity ssc WHERE ssc.salaryStructure.id = :structureId AND ssc.component.id = :componentId AND ssc.isActive = true")
    SalaryStructureComponentEntity findBySalaryStructureIdAndComponentIdAndActive(@Param("structureId") Long structureId, @Param("componentId") Long componentId);
    
    @Query("FROM SalaryStructureComponentEntity ssc WHERE ssc.salaryStructure.id = :structureId AND ssc.component.componentType = 'EARNING' AND ssc.isActive = true ORDER BY ssc.component.displayOrder")
    List<SalaryStructureComponentEntity> findEarningComponentsByStructureId(@Param("structureId") Long structureId);
    
    @Query("FROM SalaryStructureComponentEntity ssc WHERE ssc.salaryStructure.id = :structureId AND ssc.component.componentType = 'DEDUCTION' AND ssc.isActive = true ORDER BY ssc.component.displayOrder")
    List<SalaryStructureComponentEntity> findDeductionComponentsByStructureId(@Param("structureId") Long structureId);
}
