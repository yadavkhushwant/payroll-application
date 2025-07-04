package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.DesignationEntity;
import com.codemantri.payroll.tenant.service.DesignationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designations")
public class DesignationController {
    private final DesignationService designationService;

    public DesignationController(DesignationService designationService) {
        this.designationService = designationService;
    }

    @PostMapping("/create")
    public ResponseEntity<DesignationEntity> createDesignation(@RequestBody DesignationEntity designation) {
        return ResponseEntity.ok(designationService.createDesignation(designation));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DesignationEntity> updateDesignation(@PathVariable Long id, @RequestBody DesignationEntity designation) {
        return ResponseEntity.ok(designationService.updateDesignation(id, designation));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDesignation(@PathVariable Long id) {
        designationService.deleteDesignation(id);
        return ResponseEntity.ok("Designation deleted successfully");
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<DesignationEntity> getDesignationById(@PathVariable Long id) {
        return ResponseEntity.ok(designationService.getDesignationById(id));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<DesignationEntity>> getAllDesignations() {
        return ResponseEntity.ok(designationService.getAllDesignations());
    }
}
