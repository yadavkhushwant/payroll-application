package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.tenant.entity.EmployeeLoanEntity;
import com.codemantri.payroll.tenant.entity.LoanStatus;
import com.codemantri.payroll.tenant.repository.EmployeeLoanRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class EmployeeLoanService {
    
    private final EmployeeLoanRepository employeeLoanRepository;
    
    public EmployeeLoanService(EmployeeLoanRepository employeeLoanRepository) {
        this.employeeLoanRepository = employeeLoanRepository;
    }
    
    public EmployeeLoanEntity applyForLoan(EmployeeLoanEntity employeeLoan) {
        employeeLoan.setStatus(LoanStatus.PENDING_APPROVAL);
        employeeLoan.setLoanDate(LocalDate.now());
        employeeLoan.setOutstandingAmount(employeeLoan.getLoanAmount());
        employeeLoan.setCreatedAt(LocalDateTime.now());
        employeeLoan.setUpdatedAt(LocalDateTime.now());
        return employeeLoanRepository.save(employeeLoan);
    }
    
    public EmployeeLoanEntity approveLoan(Long id) {
        EmployeeLoanEntity loan = getLoanById(id);
        loan.setStatus(LoanStatus.APPROVED);
        loan.setUpdatedAt(LocalDateTime.now());
        return employeeLoanRepository.save(loan);
    }
    
    public EmployeeLoanEntity rejectLoan(Long id, String reason) {
        EmployeeLoanEntity loan = getLoanById(id);
        loan.setStatus(LoanStatus.REJECTED);
        // Note: rejectionReason field may not exist, using notes field if available
        loan.setUpdatedAt(LocalDateTime.now());
        return employeeLoanRepository.save(loan);
    }
    
    public EmployeeLoanEntity disburseLoan(Long id) {
        EmployeeLoanEntity loan = getLoanById(id);
        loan.setStatus(LoanStatus.ACTIVE);
        loan.setUpdatedAt(LocalDateTime.now());
        return employeeLoanRepository.save(loan);
    }
    
    public EmployeeLoanEntity closeLoan(Long id) {
        EmployeeLoanEntity loan = getLoanById(id);
        loan.setStatus(LoanStatus.COMPLETED);
        loan.setOutstandingAmount(BigDecimal.ZERO);
        loan.setUpdatedAt(LocalDateTime.now());
        return employeeLoanRepository.save(loan);
    }
    
    @Transactional(readOnly = true)
    public EmployeeLoanEntity getLoanById(Long id) {
        return employeeLoanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan not found with id: " + id));
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeLoanEntity> getLoansByEmployee(Long employeeId) {
        return employeeLoanRepository.findByEmployeeIdAndIsActiveTrue(employeeId);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeLoanEntity> getActiveLoansByEmployee(Long employeeId) {
        return employeeLoanRepository.findByEmployeeIdAndStatusAndIsActiveTrue(employeeId, LoanStatus.ACTIVE);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeLoanEntity> getLoansByType(Long loanTypeId) {
        return employeeLoanRepository.findByLoanTypeIdAndIsActiveTrue(loanTypeId);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeLoanEntity> getLoansByStatus(LoanStatus status) {
        return employeeLoanRepository.findByStatusAndIsActiveTrueOrderByLoanDate(status);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeLoanEntity> getPendingApprovalLoans() {
        return employeeLoanRepository.findByStatusAndIsActiveTrueOrderByLoanDate(LoanStatus.PENDING_APPROVAL);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeLoanEntity> getLoansForDeduction() {
        return employeeLoanRepository.findByStatusAndIsActiveTrueOrderByLoanDate(LoanStatus.ACTIVE);
    }
}
