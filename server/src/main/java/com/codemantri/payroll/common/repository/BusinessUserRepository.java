package com.codemantri.payroll.common.repository;

import com.codemantri.payroll.common.entity.BusinessUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessUserRepository extends JpaRepository<BusinessUserEntity, Long> {
}
