package com.codemantri.payroll.common.repository;

import com.codemantri.payroll.common.entity.PermissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PermissionRepository extends JpaRepository<PermissionEntity, Long> {
    Optional<PermissionEntity> findByName(String name);

    @Query("FROM PermissionEntity p WHERE p.isActive = true")
    List<PermissionEntity> findByActiveTrue();
}
