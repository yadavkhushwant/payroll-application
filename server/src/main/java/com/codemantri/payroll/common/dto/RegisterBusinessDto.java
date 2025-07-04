package com.codemantri.payroll.common.dto;

import lombok.Data;

@Data
public class RegisterBusinessDto {
    private String businessName;
    private String address;
    private String contactName;
    private String email;
    private String phone;
    private String panNumber;
    private String gstNumber;
}
