package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.service.PayrollDataInitializationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/payroll-setup")
public class PayrollSetupController {
    
    private final PayrollDataInitializationService dataInitializationService;
    
    public PayrollSetupController(PayrollDataInitializationService dataInitializationService) {
        this.dataInitializationService = dataInitializationService;
    }
    
    @PostMapping("/initialize-default-structure")
    public ResponseEntity<String> initializeDefaultSalaryStructure() {
        dataInitializationService.initializeDefaultSalaryStructure();
        return ResponseEntity.ok("Default salary structure initialized successfully");
    }
    
    @PostMapping("/assign-default-salary/{employeeId}")
    public ResponseEntity<String> assignDefaultSalaryToEmployee(
            @PathVariable Long employeeId,
            @RequestParam BigDecimal basicSalary) {
        dataInitializationService.assignDefaultSalaryToEmployee(employeeId, basicSalary);
        return ResponseEntity.ok("Default salary assigned to employee successfully");
    }
}
