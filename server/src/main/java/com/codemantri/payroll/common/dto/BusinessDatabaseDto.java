package com.codemantri.payroll.common.dto;

import lombok.Data;

@Data
public class BusinessDatabaseDto {
    private Long tenantId;
    private String dbUrl;
    private String username;
    private String password;
    private String driverClassName;
}
