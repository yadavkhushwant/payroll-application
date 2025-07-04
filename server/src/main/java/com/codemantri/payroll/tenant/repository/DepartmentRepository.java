package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.DepartmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository  extends JpaRepository<DepartmentEntity, Long> {
}
