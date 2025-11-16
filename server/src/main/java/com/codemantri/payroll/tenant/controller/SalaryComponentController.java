package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.ComponentType;
import com.codemantri.payroll.tenant.entity.SalaryComponentEntity;
import com.codemantri.payroll.tenant.service.SalaryComponentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salary-components")
public class SalaryComponentController {
    
    private final SalaryComponentService salaryComponentService;
    
    public SalaryComponentController(SalaryComponentService salaryComponentService) {
        this.salaryComponentService = salaryComponentService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<SalaryComponentEntity> createSalaryComponent(@RequestBody SalaryComponentEntity salaryComponent) {
        SalaryComponentEntity created = salaryComponentService.createSalaryComponent(salaryComponent);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<SalaryComponentEntity> updateSalaryComponent(
            @PathVariable Long id, 
            @RequestBody SalaryComponentEntity salaryComponent) {
        SalaryComponentEntity updated = salaryComponentService.updateSalaryComponent(id, salaryComponent);
        return ResponseEntity.ok(updated);
    }
    
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<SalaryComponentEntity> deactivateSalaryComponent(@PathVariable Long id) {
        SalaryComponentEntity deactivated = salaryComponentService.deactivateSalaryComponent(id);
        return ResponseEntity.ok(deactivated);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<SalaryComponentEntity> getSalaryComponentById(@PathVariable Long id) {
        SalaryComponentEntity salaryComponent = salaryComponentService.getSalaryComponentById(id);
        return ResponseEntity.ok(salaryComponent);
    }
    
    @GetMapping("/get-all-active")
    public ResponseEntity<List<SalaryComponentEntity>> getAllActiveSalaryComponents() {
        List<SalaryComponentEntity> salaryComponents = salaryComponentService.getAllActiveSalaryComponents();
        return ResponseEntity.ok(salaryComponents);
    }
    
    @GetMapping("/get-by-type/{type}")
    public ResponseEntity<List<SalaryComponentEntity>> getSalaryComponentsByType(@PathVariable ComponentType type) {
        List<SalaryComponentEntity> salaryComponents = salaryComponentService.getSalaryComponentsByType(type);
        return ResponseEntity.ok(salaryComponents);
    }
    
    @GetMapping("/get-by-code/{code}")
    public ResponseEntity<SalaryComponentEntity> getSalaryComponentByCode(@PathVariable String code) {
        SalaryComponentEntity salaryComponent = salaryComponentService.getSalaryComponentByCode(code);
        return ResponseEntity.ok(salaryComponent);
    }
    
    @GetMapping("/get-statutory")
    public ResponseEntity<List<SalaryComponentEntity>> getStatutoryComponents() {
        List<SalaryComponentEntity> statutoryComponents = salaryComponentService.getStatutoryComponents();
        return ResponseEntity.ok(statutoryComponents);
    }
}
