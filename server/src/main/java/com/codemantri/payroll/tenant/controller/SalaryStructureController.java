package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.SalaryStructureEntity;
import com.codemantri.payroll.tenant.service.SalaryStructureService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/salary-structures")
public class SalaryStructureController {
    
    private final SalaryStructureService salaryStructureService;
    
    public SalaryStructureController(SalaryStructureService salaryStructureService) {
        this.salaryStructureService = salaryStructureService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<SalaryStructureEntity> createSalaryStructure(@RequestBody SalaryStructureEntity salaryStructure) {
        SalaryStructureEntity created = salaryStructureService.createSalaryStructure(salaryStructure);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<SalaryStructureEntity> updateSalaryStructure(
            @PathVariable Long id, 
            @RequestBody SalaryStructureEntity salaryStructure) {
        SalaryStructureEntity updated = salaryStructureService.updateSalaryStructure(id, salaryStructure);
        return ResponseEntity.ok(updated);
    }
    
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<SalaryStructureEntity> deactivateSalaryStructure(@PathVariable Long id) {
        SalaryStructureEntity deactivated = salaryStructureService.deactivateSalaryStructure(id);
        return ResponseEntity.ok(deactivated);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<SalaryStructureEntity> getSalaryStructureById(@PathVariable Long id) {
        SalaryStructureEntity salaryStructure = salaryStructureService.getSalaryStructureById(id);
        return ResponseEntity.ok(salaryStructure);
    }
    
    @GetMapping("/get-all-active")
    public ResponseEntity<List<SalaryStructureEntity>> getAllActiveSalaryStructures() {
        List<SalaryStructureEntity> salaryStructures = salaryStructureService.getAllActiveSalaryStructures();
        return ResponseEntity.ok(salaryStructures);
    }
    
    @GetMapping("/get-by-name/{name}")
    public ResponseEntity<SalaryStructureEntity> getSalaryStructureByName(@PathVariable String name) {
        SalaryStructureEntity salaryStructure = salaryStructureService.getSalaryStructureByName(name);
        return ResponseEntity.ok(salaryStructure);
    }
    
    @GetMapping("/get-active-on-date")
    public ResponseEntity<List<SalaryStructureEntity>> getActiveSalaryStructuresOnDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<SalaryStructureEntity> salaryStructures = salaryStructureService.getActiveSalaryStructuresOnDate(date);
        return ResponseEntity.ok(salaryStructures);
    }
}
