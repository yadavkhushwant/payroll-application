package com.codemantri.payroll.common.service;

import com.codemantri.payroll.common.entity.TenantEntity;
import com.codemantri.payroll.common.repository.TenantRepository;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TenantService {
    private final TenantRepository tenantRepository;

    public TenantService(TenantRepository tenantRepository) {
        this.tenantRepository = tenantRepository;
    }

    public Map<Object, Object> getAllTenants() {
        Map<Object, Object> dataSources = new HashMap<>();
        List<TenantEntity> tenants = tenantRepository.findAll();

        for (TenantEntity tenant : tenants) {
            DataSource ds = createDataSource(tenant);
            dataSources.put(String.valueOf(tenant.getTenantId()), ds);
        }
        return dataSources;
    }

    private DataSource createDataSource(TenantEntity tenant) {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(tenant.getDbUrl());
        config.setUsername(tenant.getUsername());
        config.setPassword(tenant.getPassword());
        config.setDriverClassName(tenant.getDriverClassName());
        return new HikariDataSource(config);
    }
}

