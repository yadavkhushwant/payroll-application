package com.codemantri.payroll.common.controller;

import com.codemantri.payroll.common.entity.PermissionEntity;
import com.codemantri.payroll.common.service.PermissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
public class PermissionController {
    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @PostMapping("/create")
    public ResponseEntity<PermissionEntity> createPermission(@RequestBody PermissionEntity permission) {
        return ResponseEntity.ok(permissionService.createPermission(permission));
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<PermissionEntity> markPermissionAsInactive(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.markPermissionAsInactive(id));
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<PermissionEntity> markPermissionAsActive(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.markPermissionAsActive(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PermissionEntity> updatePermission(@PathVariable Long id, @RequestBody PermissionEntity permission) {
        return ResponseEntity.ok(permissionService.updatePermission(id, permission));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePermission(@PathVariable Long id) {
        permissionService.deletePermission(id);
        return ResponseEntity.ok("Permission deleted successfully");
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<PermissionEntity> getPermissionById(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.getPermissionById(id));
    }

    @GetMapping("/get-by-name/{name}")
    public ResponseEntity<PermissionEntity> getPermissionByName(@PathVariable String name) {
        return ResponseEntity.ok(permissionService.getPermissionByName(name));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<PermissionEntity>> getAllPermissions() {
        return ResponseEntity.ok(permissionService.getAllPermissions());
    }

    @GetMapping("/get-actives")
    public ResponseEntity<List<PermissionEntity>> getAllActivePermissions() {
        return ResponseEntity.ok(permissionService.getAllActivePermissions());
    }
}
