package com.codemantri.payroll.config.multitenancy;

import com.codemantri.payroll.common.service.TenantService;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.codemantri.payroll.tenant",
        entityManagerFactoryRef = "tenantEntityManagerFactory",
        transactionManagerRef = "tenantTransactionManager"
)
public class TenantDataSourceConfig {

    private final MultiTenantDataSource multiTenantDataSource;

    @Autowired
    public TenantDataSourceConfig(TenantService tenantService) {
        this.multiTenantDataSource = new MultiTenantDataSource(tenantService);
    }

    @Bean(name = "tenantDataSource")
    public DataSource dataSource() {
        return multiTenantDataSource;
    }

    @Bean(name = "tenantEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(EntityManagerFactoryBuilder builder) {
        Map<String, Object> hibernateProps = new HashMap<>();
        // Dynamically set the Hibernate dialect for each tenant
        hibernateProps.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");  // Default dialect (You can also fetch this from the tenant)
        hibernateProps.put("hibernate.hbm2ddl.auto", "none");
        hibernateProps.put("hibernate.show_sql", "true");
        return builder
                .dataSource(multiTenantDataSource)
                .packages("com.codemantri.payroll.tenant")
                .persistenceUnit("tenant")
                .properties(hibernateProps)
                .build();
    }


    @Bean(name = "tenantTransactionManager")
    public PlatformTransactionManager tenantTransactionManager(
            @Qualifier("tenantEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}

