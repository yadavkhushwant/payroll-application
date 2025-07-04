package com.codemantri.payroll.common.repository;

import com.codemantri.payroll.common.entity.TenantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<TenantEntity, Long> {
    boolean existsByTenantId(Long tenantId);
}
