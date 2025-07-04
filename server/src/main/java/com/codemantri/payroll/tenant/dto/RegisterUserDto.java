package com.codemantri.payroll.tenant.dto;

import lombok.Data;

@Data
public class RegisterUserDto {
    private String email;
    private String password;
    private Long roleId;
}
