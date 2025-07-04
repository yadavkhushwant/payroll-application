package com.codemantri.payroll.common.repository;

import com.codemantri.payroll.common.entity.RolePermissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface RolePermissionRepository extends JpaRepository<RolePermissionEntity, Long> {

    List<RolePermissionEntity> findByRoleId(Long roleId);

    void deleteByRoleIdAndPermissionId(Long roleId, Long permissionId);
}
