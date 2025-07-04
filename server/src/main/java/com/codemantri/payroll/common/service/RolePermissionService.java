package com.codemantri.payroll.common.service;

import com.codemantri.payroll.common.entity.PermissionEntity;
import com.codemantri.payroll.common.entity.RoleEntity;
import com.codemantri.payroll.common.entity.RolePermissionEntity;
import com.codemantri.payroll.common.repository.PermissionRepository;
import com.codemantri.payroll.common.repository.RolePermissionRepository;
import com.codemantri.payroll.common.repository.RoleRepository;
import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolePermissionService {
    private final RolePermissionRepository rolePermissionRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public RolePermissionService(RolePermissionRepository rolePermissionRepository,
                                 RoleRepository roleRepository,
                                 PermissionRepository permissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    public void assignPermissionsToRole(Long roleId, List<Long> permissionIds) {
        RoleEntity role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        List<PermissionEntity> permissions = permissionRepository.findAllById(permissionIds);

        List<RolePermissionEntity> rolePermissions = permissions.stream()
                .map(permission -> {
                    RolePermissionEntity rolePermission = new RolePermissionEntity();
                    rolePermission.setRole(role);
                    rolePermission.setPermission(permission);
                    return rolePermission;
                })
                .toList();

        rolePermissionRepository.saveAll(rolePermissions);
    }

    public List<PermissionEntity> getActivePermissionsByRoleId(Long roleId) {
        return rolePermissionRepository.findByRoleId(roleId).stream()
                .map(RolePermissionEntity::getPermission)
                .filter(PermissionEntity::isActive)
                .toList();
    }

    public void removePermissionFromRole(Long roleId, Long permissionId) {
        rolePermissionRepository.deleteByRoleIdAndPermissionId(roleId, permissionId);
    }
}
