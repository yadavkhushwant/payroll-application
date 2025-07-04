package com.codemantri.payroll.common.dto;

import lombok.Data;

@Data
public class RegisterBusinessAdminDto {
    private Long tenantId;
    private String email;
    private String password;
}
