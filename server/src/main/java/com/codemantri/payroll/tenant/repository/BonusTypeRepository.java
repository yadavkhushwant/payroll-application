package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.BonusTypeEntity;
import com.codemantri.payroll.tenant.entity.BonusFrequency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BonusTypeRepository extends JpaRepository<BonusTypeEntity, Long> {
    
    @Query("FROM BonusTypeEntity bt WHERE bt.isActive = true ORDER BY bt.displayOrder")
    List<BonusTypeEntity> findAllActiveOrderByDisplayOrder();
    
    @Query("FROM BonusTypeEntity bt WHERE bt.typeCode = :code AND bt.isActive = true")
    Optional<BonusTypeEntity> findByCodeAndActive(@Param("code") String code);
    
    @Query("FROM BonusTypeEntity bt WHERE bt.typeName = :name AND bt.isActive = true")
    Optional<BonusTypeEntity> findByNameAndActive(@Param("name") String name);
    
    @Query("FROM BonusTypeEntity bt WHERE bt.frequency = :frequency AND bt.isActive = true ORDER BY bt.displayOrder")
    List<BonusTypeEntity> findByFrequencyAndActiveOrderByDisplayOrder(@Param("frequency") BonusFrequency frequency);
    
    @Query("FROM BonusTypeEntity bt WHERE bt.isAnnual = :isAnnual AND bt.isActive = true ORDER BY bt.displayOrder")
    List<BonusTypeEntity> findByAnnualAndActiveOrderByDisplayOrder(@Param("isAnnual") Boolean isAnnual);
    
    @Query("FROM BonusTypeEntity bt WHERE bt.requiresPerformanceRating = :requiresRating AND bt.isActive = true ORDER BY bt.displayOrder")
    List<BonusTypeEntity> findByPerformanceRatingRequiredAndActiveOrderByDisplayOrder(@Param("requiresRating") Boolean requiresRating);
}
