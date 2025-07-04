package com.codemantri.payroll.common.repository;

import com.codemantri.payroll.common.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    @Query("FROM RoleEntity r WHERE r.id = :roleId AND r.isActive = true")
    Optional<RoleEntity> findActiveRoleById(@Param("roleId") Long roleId);

    Optional<RoleEntity> findByName(String name);

    @Query("FROM RoleEntity r WHERE r.isActive = true")
    List<RoleEntity> findByActiveTrue();

}
