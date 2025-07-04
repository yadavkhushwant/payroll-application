package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.entity.DepartmentEntity;
import com.codemantri.payroll.tenant.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping("/create")
    public ResponseEntity<DepartmentEntity> createDepartment(@RequestBody DepartmentEntity department) {
        return ResponseEntity.ok(departmentService.createDepartment(department));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DepartmentEntity> updateDepartment(@PathVariable Long id, @RequestBody DepartmentEntity department) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, department));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department deleted successfully");
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<DepartmentEntity> getDepartmentById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<DepartmentEntity>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }
}
