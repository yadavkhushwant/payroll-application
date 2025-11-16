package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.EmployeeBonusEntity;
import com.codemantri.payroll.tenant.entity.BonusStatus;
import com.codemantri.payroll.tenant.service.EmployeeBonusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee-bonuses")
public class EmployeeBonusController {
    
    private final EmployeeBonusService employeeBonusService;
    
    public EmployeeBonusController(EmployeeBonusService employeeBonusService) {
        this.employeeBonusService = employeeBonusService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<EmployeeBonusEntity> createBonus(@RequestBody EmployeeBonusEntity employeeBonus) {
        EmployeeBonusEntity created = employeeBonusService.createBonus(employeeBonus);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/approve/{id}")
    public ResponseEntity<EmployeeBonusEntity> approveBonus(@PathVariable Long id) {
        EmployeeBonusEntity approved = employeeBonusService.approveBonus(id);
        return ResponseEntity.ok(approved);
    }
    
    @PutMapping("/reject/{id}")
    public ResponseEntity<EmployeeBonusEntity> rejectBonus(
            @PathVariable Long id, 
            @RequestParam String reason) {
        EmployeeBonusEntity rejected = employeeBonusService.rejectBonus(id, reason);
        return ResponseEntity.ok(rejected);
    }
    
    @PutMapping("/pay/{id}")
    public ResponseEntity<EmployeeBonusEntity> payBonus(@PathVariable Long id) {
        EmployeeBonusEntity paid = employeeBonusService.payBonus(id);
        return ResponseEntity.ok(paid);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<EmployeeBonusEntity> getBonusById(@PathVariable Long id) {
        EmployeeBonusEntity bonus = employeeBonusService.getBonusById(id);
        return ResponseEntity.ok(bonus);
    }
    
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<EmployeeBonusEntity>> getBonusesByEmployee(@PathVariable Long employeeId) {
        List<EmployeeBonusEntity> bonuses = employeeBonusService.getBonusesByEmployee(employeeId);
        return ResponseEntity.ok(bonuses);
    }
    
    @GetMapping("/bonus-type/{bonusTypeId}")
    public ResponseEntity<List<EmployeeBonusEntity>> getBonusesByType(@PathVariable Long bonusTypeId) {
        List<EmployeeBonusEntity> bonuses = employeeBonusService.getBonusesByType(bonusTypeId);
        return ResponseEntity.ok(bonuses);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<EmployeeBonusEntity>> getBonusesByStatus(@PathVariable String status) {
        BonusStatus bonusStatus = BonusStatus.valueOf(status.toUpperCase());
        List<EmployeeBonusEntity> bonuses = employeeBonusService.getBonusesByStatus(bonusStatus);
        return ResponseEntity.ok(bonuses);
    }
    
    @GetMapping("/pending-approval")
    public ResponseEntity<List<EmployeeBonusEntity>> getPendingApprovalBonuses() {
        List<EmployeeBonusEntity> bonuses = employeeBonusService.getPendingApprovalBonuses();
        return ResponseEntity.ok(bonuses);
    }
    
    @GetMapping("/for-payout")
    public ResponseEntity<List<EmployeeBonusEntity>> getBonusesForPayout() {
        List<EmployeeBonusEntity> bonuses = employeeBonusService.getBonusesForPayout();
        return ResponseEntity.ok(bonuses);
    }
}
