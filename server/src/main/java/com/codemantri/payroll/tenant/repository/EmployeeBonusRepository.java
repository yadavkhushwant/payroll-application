package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.EmployeeBonusEntity;
import com.codemantri.payroll.tenant.entity.BonusStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmployeeBonusRepository extends JpaRepository<EmployeeBonusEntity, Long> {
    
    List<EmployeeBonusEntity> findByEmployeeIdAndIsActiveTrue(Long employeeId);
    
    List<EmployeeBonusEntity> findByEmployeeIdAndStatusAndIsActiveTrue(Long employeeId, BonusStatus status);
    
    List<EmployeeBonusEntity> findByEmployeeIdAndPayoutMonthAndStatusAndIsActive(
        Long employeeId, LocalDate payoutMonth, BonusStatus status, Boolean isActive);
    
    @Query("SELECT eb FROM EmployeeBonusEntity eb WHERE eb.bonusType.id = :bonusTypeId AND eb.isActive = true")
    List<EmployeeBonusEntity> findByBonusTypeIdAndIsActiveTrue(@Param("bonusTypeId") Long bonusTypeId);
    
    @Query("SELECT eb FROM EmployeeBonusEntity eb WHERE eb.status = :status AND eb.isActive = true ORDER BY eb.eligibleDate")
    List<EmployeeBonusEntity> findByStatusAndIsActiveTrueOrderByEligibleDate(@Param("status") BonusStatus status);
    
    @Query("SELECT eb FROM EmployeeBonusEntity eb WHERE eb.payoutMonth = :payoutMonth " +
           "AND eb.status = 'APPROVED' AND eb.isActive = true")
    List<EmployeeBonusEntity> findApprovedBonusesForPayout(@Param("payoutMonth") LocalDate payoutMonth);
    
    @Query("SELECT eb FROM EmployeeBonusEntity eb WHERE eb.employee.id = :employeeId " +
           "AND eb.bonusPeriodFrom <= :date AND eb.bonusPeriodTo >= :date " +
           "AND eb.isActive = true")
    List<EmployeeBonusEntity> findByEmployeeAndPeriod(@Param("employeeId") Long employeeId, @Param("date") LocalDate date);
}
