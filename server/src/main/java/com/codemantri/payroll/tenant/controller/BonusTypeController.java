package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.BonusTypeEntity;
import com.codemantri.payroll.tenant.service.BonusTypeService;
import com.codemantri.payroll.tenant.entity.BonusFrequency;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bonus-types")
public class BonusTypeController {
    
    private final BonusTypeService bonusTypeService;
    
    public BonusTypeController(BonusTypeService bonusTypeService) {
        this.bonusTypeService = bonusTypeService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<BonusTypeEntity> createBonusType(@RequestBody BonusTypeEntity bonusType) {
        BonusTypeEntity created = bonusTypeService.createBonusType(bonusType);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<BonusTypeEntity> updateBonusType(
            @PathVariable Long id, 
            @RequestBody BonusTypeEntity bonusType) {
        BonusTypeEntity updated = bonusTypeService.updateBonusType(id, bonusType);
        return ResponseEntity.ok(updated);
    }
    
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<BonusTypeEntity> deactivateBonusType(@PathVariable Long id) {
        BonusTypeEntity deactivated = bonusTypeService.deactivateBonusType(id);
        return ResponseEntity.ok(deactivated);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<BonusTypeEntity> getBonusTypeById(@PathVariable Long id) {
        BonusTypeEntity bonusType = bonusTypeService.getBonusTypeById(id);
        return ResponseEntity.ok(bonusType);
    }
    
    @GetMapping("/get-all-active")
    public ResponseEntity<List<BonusTypeEntity>> getAllActiveBonusTypes() {
        List<BonusTypeEntity> bonusTypes = bonusTypeService.getAllActiveBonusTypes();
        return ResponseEntity.ok(bonusTypes);
    }
    
    @GetMapping("/get-by-code/{code}")
    public ResponseEntity<BonusTypeEntity> getBonusTypeByCode(@PathVariable String code) {
        BonusTypeEntity bonusType = bonusTypeService.getBonusTypeByCode(code);
        return ResponseEntity.ok(bonusType);
    }
    
    @GetMapping("/get-by-name/{name}")
    public ResponseEntity<BonusTypeEntity> getBonusTypeByName(@PathVariable String name) {
        BonusTypeEntity bonusType = bonusTypeService.getBonusTypeByName(name);
        return ResponseEntity.ok(bonusType);
    }
    
    @GetMapping("/get-by-frequency/{frequency}")
    public ResponseEntity<List<BonusTypeEntity>> getBonusTypesByFrequency(@PathVariable String frequency) {
        BonusFrequency bonusFrequency = BonusFrequency.valueOf(frequency.toUpperCase());
        List<BonusTypeEntity> bonusTypes = bonusTypeService.getBonusTypesByFrequency(bonusFrequency);
        return ResponseEntity.ok(bonusTypes);
    }
}
