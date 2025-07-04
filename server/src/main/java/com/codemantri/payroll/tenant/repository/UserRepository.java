package com.codemantri.payroll.tenant.repository;

import com.codemantri.payroll.tenant.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String username);
}
