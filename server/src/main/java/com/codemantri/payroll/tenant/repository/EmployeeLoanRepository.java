package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.EmployeeLoanEntity;
import com.codemantri.payroll.tenant.entity.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmployeeLoanRepository extends JpaRepository<EmployeeLoanEntity, Long> {
    
    List<EmployeeLoanEntity> findByEmployeeIdAndIsActiveTrue(Long employeeId);
    
    List<EmployeeLoanEntity> findByEmployeeIdAndStatusAndIsActiveTrue(Long employeeId, LoanStatus status);
    
    @Query("SELECT el FROM EmployeeLoanEntity el WHERE el.employee.id = :employeeId " +
           "AND el.status = 'ACTIVE' " +
           "AND el.startDeductionFrom <= :deductionDate " +
           "AND el.isActive = true " +
           "ORDER BY el.loanDate")
    List<EmployeeLoanEntity> findActiveLoansForDeduction(@Param("employeeId") Long employeeId, 
                                                        @Param("deductionDate") LocalDate deductionDate);
    
    @Query("SELECT COUNT(el) FROM EmployeeLoanEntity el WHERE el.employee.id = :employeeId " +
           "AND el.loanType.id = :loanTypeId " +
           "AND el.status IN ('PENDING_APPROVAL', 'APPROVED', 'ACTIVE') " +
           "AND el.isActive = true")
    Long countActiveLoansForEmployeeAndType(@Param("employeeId") Long employeeId, @Param("loanTypeId") Long loanTypeId);
    
    @Query("SELECT el FROM EmployeeLoanEntity el WHERE el.loanType.id = :loanTypeId AND el.isActive = true")
    List<EmployeeLoanEntity> findByLoanTypeIdAndIsActiveTrue(@Param("loanTypeId") Long loanTypeId);
    
    @Query("SELECT el FROM EmployeeLoanEntity el WHERE el.status = :status AND el.isActive = true ORDER BY el.loanDate")
    List<EmployeeLoanEntity> findByStatusAndIsActiveTrueOrderByLoanDate(@Param("status") LoanStatus status);
}
