package com.codemantri.payroll.common.service;

import com.codemantri.payroll.common.entity.RoleEntity;
import com.codemantri.payroll.common.repository.RoleRepository;
import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public RoleEntity createRole(RoleEntity role) {
        return roleRepository.save(role);
    }

    public RoleEntity markRoleAsInactive(Long id) {
        RoleEntity role = getRoleById(id);
        role.setActive(false);
        return roleRepository.save(role);
    }

    public RoleEntity markRoleAsActive(Long id) {
        RoleEntity role = getRoleById(id);
        role.setActive(true);
        return roleRepository.save(role);
    }

    public RoleEntity updateRole(Long id, RoleEntity role) {
        RoleEntity roleToUpdate = getRoleById(id);
        roleToUpdate.setName(role.getName());
        return roleRepository.save(roleToUpdate);
    }

    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    public RoleEntity getRoleById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
    }

    public RoleEntity getRoleByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
    }

    public List<RoleEntity> getAllRoles() {
        return roleRepository.findAll();
    }

    public List<RoleEntity> getAllActiveRoles(){
        return roleRepository.findByActiveTrue();
    }
}
