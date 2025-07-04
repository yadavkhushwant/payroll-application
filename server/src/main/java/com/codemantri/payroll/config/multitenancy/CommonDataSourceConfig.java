package com.codemantri.payroll.config.multitenancy;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.beans.factory.annotation.Value;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;


@Configuration
@Primary
@EnableJpaRepositories(
        basePackages = "com.codemantri.payroll.common",
        entityManagerFactoryRef = "commonEntityManagerFactory",
        transactionManagerRef = "commonTransactionManager"
)
public class CommonDataSourceConfig {

    @Value("${spring.jpa.common.hibernate.ddl-auto}")
    private String hbm2ddlAuto;

    @Value("${spring.jpa.common.show-sql}")
    private boolean showSql;

    @Value("${spring.jpa.common.properties.hibernate.dialect}")
    private String dialect;

    @Value("${spring.common.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.common.datasource.username}")
    private String username;

    @Value("${spring.common.datasource.password}")
    private String password;

    @Value("${spring.common.datasource.driver-class-name}")
    private String driver;

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        return new HibernateJpaVendorAdapter();
    }

    @Bean
    public EntityManagerFactoryBuilder entityManagerFactoryBuilder(JpaVendorAdapter jpaVendorAdapter) {
        return new EntityManagerFactoryBuilder(jpaVendorAdapter, new HashMap<>(), null);
    }

    @Bean(name = "commonDataSource")
    @Primary
    public DataSource commonDataSource() {
        return DataSourceBuilder.create()
                .url(jdbcUrl)
                .username(username)
                .password(password)
                .driverClassName(driver)
                .build();
    }

    @Bean(name = "commonEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean commonEntityManagerFactory(
            @Qualifier("commonDataSource") DataSource dataSource,
            EntityManagerFactoryBuilder builder) {

        Map<String, Object> hibernateProps = new HashMap<>();
        hibernateProps.put("hibernate.dialect", dialect);
        hibernateProps.put("hibernate.hbm2ddl.auto", hbm2ddlAuto);
        hibernateProps.put("hibernate.show_sql", showSql);

        return builder
                .dataSource(dataSource)
                .packages("com.codemantri.payroll.common")
                .persistenceUnit("common")
                .properties(hibernateProps)
                .build();
    }

    @Bean(name = "commonTransactionManager")
    public JpaTransactionManager commonTransactionManager(
            @Qualifier("commonEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}

