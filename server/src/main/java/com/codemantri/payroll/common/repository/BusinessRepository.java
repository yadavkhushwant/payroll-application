package com.codemantri.payroll.common.repository;

import com.codemantri.payroll.common.entity.BusinessEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessRepository extends JpaRepository<BusinessEntity, Long> {
    Optional<BusinessEntity> findByTenantId(Long tenantId);
}
