package com.codemantri.payroll.tenant.dto;

import com.codemantri.payroll.tenant.entity.CalculationType;
import com.codemantri.payroll.tenant.entity.ComponentType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateSalaryComponentDto {
    private String componentName;
    private String componentCode;
    private ComponentType componentType;
    private CalculationType calculationType;
    private Boolean isTaxable = true;
    private Boolean isStatutory = false;
    private BigDecimal defaultValue;
    private String formula;
    private Integer displayOrder;
    private String createdBy;
}
