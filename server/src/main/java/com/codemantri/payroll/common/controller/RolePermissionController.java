package com.codemantri.payroll.common.controller;

import com.codemantri.payroll.common.entity.PermissionEntity;
import com.codemantri.payroll.common.service.RolePermissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role-permissions")
public class RolePermissionController {
    private final RolePermissionService rolePermissionService;

    public RolePermissionController(RolePermissionService rolePermissionService) {
        this.rolePermissionService = rolePermissionService;
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignPermissionsToRole(@RequestParam Long roleId, @RequestBody List<Long> permissionIds) {
        rolePermissionService.assignPermissionsToRole(roleId, permissionIds);
        return ResponseEntity.ok("Permissions assigned successfully");
    }

    @GetMapping("/get-active-permissions")
    public ResponseEntity<List<PermissionEntity>> getActivePermissionsByRoleId(@RequestParam Long roleId) {
        return ResponseEntity.ok(rolePermissionService.getActivePermissionsByRoleId(roleId));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removePermissionFromRole(@RequestParam Long roleId, @RequestParam Long permissionId) {
        rolePermissionService.removePermissionFromRole(roleId, permissionId);
        return ResponseEntity.ok("Permission removed successfully");
    }
}
