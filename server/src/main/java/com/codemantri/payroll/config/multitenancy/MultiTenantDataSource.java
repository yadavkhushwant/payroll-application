package com.codemantri.payroll.config.multitenancy;

import com.codemantri.payroll.common.service.TenantService;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.stereotype.Component;

public class MultiTenantDataSource extends AbstractRoutingDataSource {

    public MultiTenantDataSource(TenantService tenantService) {
        setTargetDataSources(tenantService.getAllTenants());
        afterPropertiesSet();
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return TenantContext.getCurrentTenant();
    }
}

