package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.LoanTypeEntity;
import com.codemantri.payroll.tenant.service.LoanTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan-types")
public class LoanTypeController {
    
    private final LoanTypeService loanTypeService;
    
    public LoanTypeController(LoanTypeService loanTypeService) {
        this.loanTypeService = loanTypeService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<LoanTypeEntity> createLoanType(@RequestBody LoanTypeEntity loanType) {
        LoanTypeEntity created = loanTypeService.createLoanType(loanType);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<LoanTypeEntity> updateLoanType(
            @PathVariable Long id, 
            @RequestBody LoanTypeEntity loanType) {
        LoanTypeEntity updated = loanTypeService.updateLoanType(id, loanType);
        return ResponseEntity.ok(updated);
    }
    
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<LoanTypeEntity> deactivateLoanType(@PathVariable Long id) {
        LoanTypeEntity deactivated = loanTypeService.deactivateLoanType(id);
        return ResponseEntity.ok(deactivated);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<LoanTypeEntity> getLoanTypeById(@PathVariable Long id) {
        LoanTypeEntity loanType = loanTypeService.getLoanTypeById(id);
        return ResponseEntity.ok(loanType);
    }
    
    @GetMapping("/get-all-active")
    public ResponseEntity<List<LoanTypeEntity>> getAllActiveLoanTypes() {
        List<LoanTypeEntity> loanTypes = loanTypeService.getAllActiveLoanTypes();
        return ResponseEntity.ok(loanTypes);
    }
    
    @GetMapping("/get-by-code/{code}")
    public ResponseEntity<LoanTypeEntity> getLoanTypeByCode(@PathVariable String code) {
        LoanTypeEntity loanType = loanTypeService.getLoanTypeByCode(code);
        return ResponseEntity.ok(loanType);
    }
    
    @GetMapping("/get-by-name/{name}")
    public ResponseEntity<LoanTypeEntity> getLoanTypeByName(@PathVariable String name) {
        LoanTypeEntity loanType = loanTypeService.getLoanTypeByName(name);
        return ResponseEntity.ok(loanType);
    }
    
    @GetMapping("/get-advance-types")
    public ResponseEntity<List<LoanTypeEntity>> getAdvanceTypes() {
        List<LoanTypeEntity> advanceTypes = loanTypeService.getAdvanceTypes();
        return ResponseEntity.ok(advanceTypes);
    }
    
    @GetMapping("/get-loan-types")
    public ResponseEntity<List<LoanTypeEntity>> getLoanTypes() {
        List<LoanTypeEntity> loanTypes = loanTypeService.getLoanTypes();
        return ResponseEntity.ok(loanTypes);
    }
    
    @GetMapping("/get-no-approval-required")
    public ResponseEntity<List<LoanTypeEntity>> getLoanTypesWithoutApproval() {
        List<LoanTypeEntity> loanTypes = loanTypeService.getLoanTypesWithoutApproval();
        return ResponseEntity.ok(loanTypes);
    }
}
