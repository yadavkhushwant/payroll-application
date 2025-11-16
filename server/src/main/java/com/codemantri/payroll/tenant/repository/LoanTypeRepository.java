package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.LoanTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanTypeRepository extends JpaRepository<LoanTypeEntity, Long> {
    
    @Query("FROM LoanTypeEntity lt WHERE lt.isActive = true ORDER BY lt.displayOrder")
    List<LoanTypeEntity> findAllActiveOrderByDisplayOrder();
    
    @Query("FROM LoanTypeEntity lt WHERE lt.typeCode = :code AND lt.isActive = true")
    Optional<LoanTypeEntity> findByCodeAndActive(@Param("code") String code);
    
    @Query("FROM LoanTypeEntity lt WHERE lt.typeName = :name AND lt.isActive = true")
    Optional<LoanTypeEntity> findByNameAndActive(@Param("name") String name);
    
    @Query("FROM LoanTypeEntity lt WHERE lt.isAdvanceType = :isAdvance AND lt.isActive = true ORDER BY lt.displayOrder")
    List<LoanTypeEntity> findByAdvanceTypeAndActiveOrderByDisplayOrder(@Param("isAdvance") Boolean isAdvance);
    
    @Query("FROM LoanTypeEntity lt WHERE lt.requiresApproval = :requiresApproval AND lt.isActive = true ORDER BY lt.displayOrder")
    List<LoanTypeEntity> findByRequiresApprovalAndActiveOrderByDisplayOrder(@Param("requiresApproval") Boolean requiresApproval);
}
