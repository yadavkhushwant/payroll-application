package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.EmployeeSalaryEntity;
import com.codemantri.payroll.tenant.service.EmployeeSalaryService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/employee-salary")
public class EmployeeSalaryController {
    
    private final EmployeeSalaryService employeeSalaryService;
    
    public EmployeeSalaryController(EmployeeSalaryService employeeSalaryService) {
        this.employeeSalaryService = employeeSalaryService;
    }
    
    @PostMapping("/assign")
    public ResponseEntity<EmployeeSalaryEntity> assignSalaryToEmployee(@RequestBody EmployeeSalaryEntity employeeSalary) {
        EmployeeSalaryEntity assigned = employeeSalaryService.assignSalaryToEmployee(employeeSalary);
        return ResponseEntity.ok(assigned);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<EmployeeSalaryEntity> updateEmployeeSalary(
            @PathVariable Long id, 
            @RequestBody EmployeeSalaryEntity employeeSalary) {
        EmployeeSalaryEntity updated = employeeSalaryService.updateEmployeeSalary(id, employeeSalary);
        return ResponseEntity.ok(updated);
    }
    
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<EmployeeSalaryEntity> deactivateEmployeeSalary(@PathVariable Long id) {
        EmployeeSalaryEntity deactivated = employeeSalaryService.deactivateEmployeeSalary(id);
        return ResponseEntity.ok(deactivated);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<EmployeeSalaryEntity> getEmployeeSalaryById(@PathVariable Long id) {
        EmployeeSalaryEntity employeeSalary = employeeSalaryService.getEmployeeSalaryById(id);
        return ResponseEntity.ok(employeeSalary);
    }
    
    @GetMapping("/get-history/{employeeId}")
    public ResponseEntity<List<EmployeeSalaryEntity>> getEmployeeSalaryHistory(@PathVariable Long employeeId) {
        List<EmployeeSalaryEntity> salaryHistory = employeeSalaryService.getEmployeeSalaryHistory(employeeId);
        return ResponseEntity.ok(salaryHistory);
    }
    
    @GetMapping("/get-current/{employeeId}")
    public ResponseEntity<EmployeeSalaryEntity> getCurrentEmployeeSalary(@PathVariable Long employeeId) {
        EmployeeSalaryEntity currentSalary = employeeSalaryService.getCurrentEmployeeSalary(employeeId);
        return ResponseEntity.ok(currentSalary);
    }
    
    @GetMapping("/get-current-on-date/{employeeId}")
    public ResponseEntity<EmployeeSalaryEntity> getCurrentEmployeeSalaryOnDate(
            @PathVariable Long employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate asOfDate) {
        EmployeeSalaryEntity currentSalary = employeeSalaryService.getCurrentEmployeeSalary(employeeId, asOfDate);
        return ResponseEntity.ok(currentSalary);
    }
    
    @GetMapping("/get-latest/{employeeId}")
    public ResponseEntity<EmployeeSalaryEntity> getLatestEmployeeSalary(@PathVariable Long employeeId) {
        EmployeeSalaryEntity latestSalary = employeeSalaryService.getLatestEmployeeSalary(employeeId);
        return ResponseEntity.ok(latestSalary);
    }
    
    @GetMapping("/get-by-structure/{structureId}")
    public ResponseEntity<List<EmployeeSalaryEntity>> getEmployeesBySalaryStructure(@PathVariable Long structureId) {
        List<EmployeeSalaryEntity> employees = employeeSalaryService.getEmployeesBySalaryStructure(structureId);
        return ResponseEntity.ok(employees);
    }
}
