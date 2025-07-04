package com.codemantri.payroll.tenant.dto;

import com.codemantri.payroll.tenant.entity.DepartmentEntity;
import com.codemantri.payroll.tenant.entity.DesignationEntity;
import lombok.Data;

@Data
public class RegisterEmployeeDto extends RegisterUserDto{
    private String firstName;
    private String lastName;
    private DepartmentEntity department;
    private DesignationEntity designation;
    private String aadharNumber;
    private String panNumber;
    private String mobileNumber;
    private String street;
    private String city;
    private String state;
    private String zipCode;
}
