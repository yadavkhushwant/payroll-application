package com.codemantri.payroll.common.service;

import com.codemantri.payroll.common.dto.BusinessDatabaseDto;
import com.codemantri.payroll.common.dto.RegisterBusinessAdminDto;
import com.codemantri.payroll.common.dto.RegisterBusinessDto;
import com.codemantri.payroll.common.entity.BusinessEntity;
import com.codemantri.payroll.common.entity.TenantEntity;
import com.codemantri.payroll.common.repository.BusinessRepository;
import com.codemantri.payroll.common.repository.RoleRepository;
import com.codemantri.payroll.common.repository.TenantRepository;
import com.codemantri.payroll.config.multitenancy.TenantContext;
import com.codemantri.payroll.tenant.entity.UserEntity;
import com.codemantri.payroll.tenant.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BusinessService {
    private final BusinessRepository businessRepository;
    private final TenantRepository tenantRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public BusinessService(BusinessRepository businessRepository, TenantRepository tenantRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, RoleRepository roleRepository, UserRepository userRepository) {
        this.businessRepository = businessRepository;
        this.tenantRepository = tenantRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    public BusinessEntity registerBusiness(RegisterBusinessDto dto) {
        BusinessEntity businessEntity = modelMapper.map(dto, BusinessEntity.class);
        businessEntity.setActive(false);
        businessEntity.setSetupCompleted(false);
        return businessRepository.save(businessEntity);
    }

    @Transactional("commonTransactionManager") // will roll back if any exception occurs
    public BusinessEntity setupBusinessDatabase(BusinessDatabaseDto dto) {
        var businessEntity = businessRepository.findByTenantId(dto.getTenantId()).orElseThrow(() -> new ResourceAccessException("Business not found"));
        var isTenantExists = tenantRepository.existsByTenantId(dto.getTenantId());
        if (isTenantExists) {
            throw new ResourceAccessException("Tenant already exists");
        }
        var tenantEntity = new TenantEntity();
        tenantEntity.setTenantId(dto.getTenantId());
        tenantEntity.setDbUrl(dto.getDbUrl());
        tenantEntity.setUsername(dto.getUsername());
        tenantEntity.setPassword(dto.getPassword());
        tenantEntity.setDriverClassName(dto.getDriverClassName());
        tenantRepository.save(tenantEntity);

        businessEntity.setSetupCompleted(true);
        businessEntity.setSetupCompletedAt(LocalDateTime.now());
        businessEntity.setActive(true);

        return businessRepository.save(businessEntity);
    }

    public UserEntity createBusinessAdminUser(RegisterBusinessAdminDto dto) {
        var business = businessRepository.findByTenantId(dto.getTenantId())
                .orElseThrow(() -> new ResourceAccessException("Business not found"));
        if (!business.isSetupCompleted()) {
            throw new ResourceAccessException("Business setup not completed");
        }
        if (!business.isActive()) {
            throw new ResourceAccessException("Business is not active");
        }
        var adminRole = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new ResourceAccessException("Admin role not found"));

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(dto.getEmail());
        userEntity.setPhone(dto.getPhone());
        userEntity.setPassword(passwordEncoder.encode(dto.getPassword()));
        userEntity.setRoleId(adminRole.getId());

        // Switch to tenant-specific database
        try {
            TenantContext.setCurrentTenant(dto.getTenantId().toString());
            return userRepository.save(userEntity);
        } finally {
            TenantContext.clear();
        }

    }

    public List<BusinessEntity> getAllBusinesses() {
        return businessRepository.findAll();
    }


}
