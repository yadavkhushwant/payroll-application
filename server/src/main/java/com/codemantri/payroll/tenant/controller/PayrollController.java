package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.service.PayrollCalculationService;
import com.codemantri.payroll.tenant.service.AdvancedPayrollCalculationService;
import com.codemantri.payroll.tenant.dto.PayrollSummaryDto;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {
    
    private final PayrollCalculationService payrollCalculationService;
    private final AdvancedPayrollCalculationService advancedPayrollCalculationService;
    
    public PayrollController(PayrollCalculationService payrollCalculationService,
                           AdvancedPayrollCalculationService advancedPayrollCalculationService) {
        this.payrollCalculationService = payrollCalculationService;
        this.advancedPayrollCalculationService = advancedPayrollCalculationService;
    }
    
    @GetMapping("/calculate/{employeeId}")
    public ResponseEntity<PayrollCalculationService.PayrollCalculationResult> calculateBasicPayroll(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth payrollMonth) {
        
        PayrollCalculationService.PayrollCalculationResult result = 
                payrollCalculationService.calculateBasicPayroll(employeeId, payrollMonth);
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/calculate-advanced/{employeeId}")
    public ResponseEntity<PayrollSummaryDto> calculateAdvancedPayroll(
            @PathVariable Long employeeId,
            @RequestParam int month,
            @RequestParam int year) {
        PayrollSummaryDto payroll = advancedPayrollCalculationService.calculatePayroll(employeeId, month, year);
        return ResponseEntity.ok(payroll);
    }
    
    @PostMapping("/calculate-bulk")
    public ResponseEntity<List<PayrollSummaryDto>> calculateBulkPayroll(
            @RequestParam int month,
            @RequestParam int year,
            @RequestBody(required = false) List<Long> employeeIds) {
        List<PayrollSummaryDto> payrolls;
        if (employeeIds != null && !employeeIds.isEmpty()) {
            payrolls = advancedPayrollCalculationService.calculateBulkPayroll(employeeIds, month, year);
        } else {
            payrolls = advancedPayrollCalculationService.calculateAllEmployeesPayroll(month, year);
        }
        return ResponseEntity.ok(payrolls);
    }
    
    @PostMapping("/process-loan-deductions")
    public ResponseEntity<String> processLoanDeductions(
            @RequestParam int month,
            @RequestParam int year) {
        advancedPayrollCalculationService.processLoanDeductions(month, year);
        return ResponseEntity.ok("Loan deductions processed successfully for " + month + "/" + year);
    }
    
    @PostMapping("/process-bonuses")
    public ResponseEntity<String> processBonuses(
            @RequestParam int month,
            @RequestParam int year) {
        advancedPayrollCalculationService.processBonuses(month, year);
        return ResponseEntity.ok("Bonuses processed successfully for " + month + "/" + year);
    }
    
    @GetMapping("/summary/{employeeId}")
    public ResponseEntity<PayrollSummaryDto> getPayrollSummary(
            @PathVariable Long employeeId,
            @RequestParam int month,
            @RequestParam int year) {
        PayrollSummaryDto summary = advancedPayrollCalculationService.getPayrollSummary(employeeId, month, year);
        return ResponseEntity.ok(summary);
    }
    
    @GetMapping("/statutory-deductions")
    public ResponseEntity<Map<String, BigDecimal>> calculateStatutoryDeductions(
            @RequestParam BigDecimal grossSalary) {
        
        Map<String, BigDecimal> deductions = payrollCalculationService.calculateStatutoryDeductions(grossSalary);
        return ResponseEntity.ok(deductions);
    }
}
