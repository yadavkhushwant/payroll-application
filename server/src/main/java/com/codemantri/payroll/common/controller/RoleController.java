package com.codemantri.payroll.common.controller;

import com.codemantri.payroll.common.entity.RoleEntity;
import com.codemantri.payroll.common.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/create")
    public ResponseEntity<RoleEntity> createRole(@RequestBody RoleEntity role) {
        return ResponseEntity.ok(roleService.createRole(role));
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<RoleEntity> markRoleAsInactive(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.markRoleAsInactive(id));
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<RoleEntity> markRoleAsActive(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.markRoleAsActive(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RoleEntity> updateRole(@PathVariable Long id, @RequestBody RoleEntity role) {
        return ResponseEntity.ok(roleService.updateRole(id, role));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.ok("Role deleted successfully");
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<RoleEntity> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @GetMapping("/get-by-name/{name}")
    public ResponseEntity<RoleEntity> getRoleByName(@PathVariable String name) {
        return ResponseEntity.ok(roleService.getRoleByName(name));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<RoleEntity>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @GetMapping("/get-actives")
    public ResponseEntity<List<RoleEntity>> getAllActiveRoles() {
        return ResponseEntity.ok(roleService.getAllActiveRoles());
    }
}
