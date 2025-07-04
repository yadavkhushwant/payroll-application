package com.codemantri.payroll.common.service;

import com.codemantri.payroll.common.entity.PermissionEntity;
import com.codemantri.payroll.common.repository.PermissionRepository;
import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService {
    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public PermissionEntity createPermission(PermissionEntity permission) {
        return permissionRepository.save(permission);
    }

    public PermissionEntity markPermissionAsInactive(Long id) {
        PermissionEntity permission = getPermissionById(id);
        permission.setActive(false);
        return permissionRepository.save(permission);
    }

    public PermissionEntity markPermissionAsActive(Long id) {
        PermissionEntity permission = getPermissionById(id);
        permission.setActive(true);
        return permissionRepository.save(permission);
    }

    public PermissionEntity updatePermission(Long id, PermissionEntity permission) {
        PermissionEntity permissionToUpdate = getPermissionById(id);
        permissionToUpdate.setName(permission.getName());
        return permissionRepository.save(permissionToUpdate);
    }

    public void deletePermission(Long id) {
        permissionRepository.deleteById(id);
    }

    public PermissionEntity getPermissionById(Long id) {
        return permissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found"));
    }

    public PermissionEntity getPermissionByName(String name) {
        return permissionRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found"));
    }

    public List<PermissionEntity> getAllPermissions() {
        return permissionRepository.findAll();
    }

    public List<PermissionEntity> getAllActivePermissions(){
        return permissionRepository.findByActiveTrue();
    }

}
