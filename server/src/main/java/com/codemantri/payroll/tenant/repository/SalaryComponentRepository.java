package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.ComponentType;
import com.codemantri.payroll.tenant.entity.SalaryComponentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SalaryComponentRepository extends JpaRepository<SalaryComponentEntity, Long> {
    
    @Query("FROM SalaryComponentEntity c WHERE c.isActive = true ORDER BY c.displayOrder")
    List<SalaryComponentEntity> findAllActiveOrderByDisplayOrder();
    
    @Query("FROM SalaryComponentEntity c WHERE c.componentType = :type AND c.isActive = true ORDER BY c.displayOrder")
    List<SalaryComponentEntity> findByTypeAndActiveOrderByDisplayOrder(@Param("type") ComponentType type);
    
    @Query("FROM SalaryComponentEntity c WHERE c.componentCode = :code AND c.isActive = true")
    Optional<SalaryComponentEntity> findByCodeAndActive(@Param("code") String code);
    
    @Query("FROM SalaryComponentEntity c WHERE c.isStatutory = true AND c.isActive = true ORDER BY c.displayOrder")
    List<SalaryComponentEntity> findStatutoryComponentsActive();
}
