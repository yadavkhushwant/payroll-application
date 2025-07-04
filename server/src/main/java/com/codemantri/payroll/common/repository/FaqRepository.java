package com.codemantri.payroll.common.repository;

import com.codemantri.payroll.common.entity.FaqEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

//@Transactional("commonTransactionManager")
public interface FaqRepository extends JpaRepository<FaqEntity, Long> {
}
