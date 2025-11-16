package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.EmployeeLoanEntity;
import com.codemantri.payroll.tenant.entity.LoanStatus;
import com.codemantri.payroll.tenant.service.EmployeeLoanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee-loans")
public class EmployeeLoanController {
    
    private final EmployeeLoanService employeeLoanService;
    
    public EmployeeLoanController(EmployeeLoanService employeeLoanService) {
        this.employeeLoanService = employeeLoanService;
    }
    
    @PostMapping("/apply")
    public ResponseEntity<EmployeeLoanEntity> applyForLoan(@RequestBody EmployeeLoanEntity employeeLoan) {
        EmployeeLoanEntity created = employeeLoanService.applyForLoan(employeeLoan);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/approve/{id}")
    public ResponseEntity<EmployeeLoanEntity> approveLoan(@PathVariable Long id) {
        EmployeeLoanEntity approved = employeeLoanService.approveLoan(id);
        return ResponseEntity.ok(approved);
    }
    
    @PutMapping("/reject/{id}")
    public ResponseEntity<EmployeeLoanEntity> rejectLoan(
            @PathVariable Long id, 
            @RequestParam String reason) {
        EmployeeLoanEntity rejected = employeeLoanService.rejectLoan(id, reason);
        return ResponseEntity.ok(rejected);
    }
    
    @PutMapping("/disburse/{id}")
    public ResponseEntity<EmployeeLoanEntity> disburseLoan(@PathVariable Long id) {
        EmployeeLoanEntity disbursed = employeeLoanService.disburseLoan(id);
        return ResponseEntity.ok(disbursed);
    }
    
    @PutMapping("/close/{id}")
    public ResponseEntity<EmployeeLoanEntity> closeLoan(@PathVariable Long id) {
        EmployeeLoanEntity closed = employeeLoanService.closeLoan(id);
        return ResponseEntity.ok(closed);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<EmployeeLoanEntity> getLoanById(@PathVariable Long id) {
        EmployeeLoanEntity loan = employeeLoanService.getLoanById(id);
        return ResponseEntity.ok(loan);
    }
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<EmployeeLoanEntity>> getLoansByEmployee(@PathVariable Long employeeId) {
        List<EmployeeLoanEntity> loans = employeeLoanService.getLoansByEmployee(employeeId);
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping("/employee/{employeeId}/active")
    public ResponseEntity<List<EmployeeLoanEntity>> getActiveLoansByEmployee(@PathVariable Long employeeId) {
        List<EmployeeLoanEntity> loans = employeeLoanService.getActiveLoansByEmployee(employeeId);
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping("/loan-type/{loanTypeId}")
    public ResponseEntity<List<EmployeeLoanEntity>> getLoansByType(@PathVariable Long loanTypeId) {
        List<EmployeeLoanEntity> loans = employeeLoanService.getLoansByType(loanTypeId);
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<EmployeeLoanEntity>> getLoansByStatus(@PathVariable String status) {
        LoanStatus loanStatus = LoanStatus.valueOf(status.toUpperCase());
        List<EmployeeLoanEntity> loans = employeeLoanService.getLoansByStatus(loanStatus);
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping("/pending-approval")
    public ResponseEntity<List<EmployeeLoanEntity>> getPendingApprovalLoans() {
        List<EmployeeLoanEntity> loans = employeeLoanService.getPendingApprovalLoans();
        return ResponseEntity.ok(loans);
    }
    
    @GetMapping("/due-for-deduction")
    public ResponseEntity<List<EmployeeLoanEntity>> getLoansForDeduction() {
        List<EmployeeLoanEntity> loans = employeeLoanService.getLoansForDeduction();
        return ResponseEntity.ok(loans);
    }
}
