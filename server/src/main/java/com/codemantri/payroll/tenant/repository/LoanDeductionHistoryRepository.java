package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.LoanDeductionHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LoanDeductionHistoryRepository extends JpaRepository<LoanDeductionHistoryEntity, Long> {
    
    List<LoanDeductionHistoryEntity> findByLoanIdOrderByDeductionMonthDesc(Long loanId);
    
    boolean existsByLoanIdAndDeductionMonth(Long loanId, LocalDate deductionMonth);
    
    @Query("SELECT ldh FROM LoanDeductionHistoryEntity ldh WHERE ldh.loan.employee.id = :employeeId " +
           "ORDER BY ldh.deductionMonth DESC")
    List<LoanDeductionHistoryEntity> findByEmployeeIdOrderByDeductionMonthDesc(@Param("employeeId") Long employeeId);
    
    @Query("SELECT ldh FROM LoanDeductionHistoryEntity ldh WHERE ldh.deductionMonth = :month " +
           "ORDER BY ldh.processedAt")
    List<LoanDeductionHistoryEntity> findByDeductionMonthOrderByProcessedAt(@Param("month") LocalDate month);
    
    @Query("SELECT SUM(ldh.deductedAmount) FROM LoanDeductionHistoryEntity ldh " +
           "WHERE ldh.loan.employee.id = :employeeId AND ldh.deductionMonth = :month")
    java.math.BigDecimal getTotalDeductionForEmployeeAndMonth(@Param("employeeId") Long employeeId, 
                                                              @Param("month") LocalDate month);
}
