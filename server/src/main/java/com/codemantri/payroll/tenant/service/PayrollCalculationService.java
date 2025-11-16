package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.tenant.entity.*;
import com.codemantri.payroll.tenant.repository.SalaryStructureComponentRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PayrollCalculationService {
    
    private final EmployeeSalaryService employeeSalaryService;
    private final SalaryStructureComponentRepository salaryStructureComponentRepository;
    
    public PayrollCalculationService(
            EmployeeSalaryService employeeSalaryService,
            SalaryStructureComponentRepository salaryStructureComponentRepository) {
        this.employeeSalaryService = employeeSalaryService;
        this.salaryStructureComponentRepository = salaryStructureComponentRepository;
    }
    
    /**
     * Calculate basic payroll for an employee for a given month
     */
    public PayrollCalculationResult calculateBasicPayroll(Long employeeId, YearMonth payrollMonth) {
        LocalDate payrollDate = payrollMonth.atDay(1);
        
        // Get employee's current salary structure
        EmployeeSalaryEntity employeeSalary = employeeSalaryService.getCurrentEmployeeSalary(employeeId, payrollDate);
        
        // Get salary structure components
        List<SalaryStructureComponentEntity> components = salaryStructureComponentRepository
                .findBySalaryStructureIdAndActiveOrderByDisplayOrder(employeeSalary.getSalaryStructure().getId());
        
        PayrollCalculationResult result = new PayrollCalculationResult();
        result.setEmployeeId(employeeId);
        result.setPayrollMonth(payrollMonth);
        result.setBasicSalary(employeeSalary.getBasicSalary());
        
        Map<String, BigDecimal> earnings = new HashMap<>();
        Map<String, BigDecimal> deductions = new HashMap<>();
        
        BigDecimal totalEarnings = BigDecimal.ZERO;
        BigDecimal totalDeductions = BigDecimal.ZERO;
        
        for (SalaryStructureComponentEntity component : components) {
            SalaryComponentEntity salaryComponent = component.getComponent();
            BigDecimal componentValue = calculateComponentValue(component, employeeSalary);
            
            if (salaryComponent.getComponentType() == ComponentType.EARNING) {
                earnings.put(salaryComponent.getComponentCode(), componentValue);
                totalEarnings = totalEarnings.add(componentValue);
            } else {
                deductions.put(salaryComponent.getComponentCode(), componentValue);
                totalDeductions = totalDeductions.add(componentValue);
            }
        }
        
        result.setEarnings(earnings);
        result.setDeductions(deductions);
        result.setTotalEarnings(totalEarnings);
        result.setTotalDeductions(totalDeductions);
        result.setNetSalary(totalEarnings.subtract(totalDeductions));
        
        return result;
    }
    
    /**
     * Calculate individual component value based on its configuration
     */
    private BigDecimal calculateComponentValue(SalaryStructureComponentEntity component, EmployeeSalaryEntity employeeSalary) {
        BigDecimal value = BigDecimal.ZERO;
        
        if (component.getComponentValue() != null) {
            if (component.getIsPercentage()) {
                BigDecimal baseAmount = getBaseAmount(component.getPercentageBase(), employeeSalary);
                value = baseAmount.multiply(component.getComponentValue()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            } else {
                value = component.getComponentValue();
            }
        } else if (component.getComponent().getDefaultValue() != null) {
            value = component.getComponent().getDefaultValue();
        }
        
        return value;
    }
    
    /**
     * Get base amount for percentage calculations
     */
    private BigDecimal getBaseAmount(PercentageBase percentageBase, EmployeeSalaryEntity employeeSalary) {
        if (percentageBase == null) {
            return employeeSalary.getBasicSalary();
        }
        
        return switch (percentageBase) {
            case BASIC -> employeeSalary.getBasicSalary();
            case GROSS -> employeeSalary.getGrossSalary() != null ? employeeSalary.getGrossSalary() : employeeSalary.getBasicSalary();
            case CTC -> employeeSalary.getCtc() != null ? employeeSalary.getCtc() : employeeSalary.getBasicSalary();
        };
    }
    
    /**
     * Calculate statutory deductions (PF, ESI, PT)
     */
    public Map<String, BigDecimal> calculateStatutoryDeductions(BigDecimal grossSalary) {
        Map<String, BigDecimal> statutoryDeductions = new HashMap<>();
        
        // PF Calculation (12% of basic salary up to 15,000)
        BigDecimal pfEligibleSalary = grossSalary.min(BigDecimal.valueOf(15000));
        BigDecimal pf = pfEligibleSalary.multiply(BigDecimal.valueOf(0.12)).setScale(2, RoundingMode.HALF_UP);
        statutoryDeductions.put("PF", pf);
        
        // ESI Calculation (0.75% if gross salary <= 21,000)
        if (grossSalary.compareTo(BigDecimal.valueOf(21000)) <= 0) {
            BigDecimal esi = grossSalary.multiply(BigDecimal.valueOf(0.0075)).setScale(2, RoundingMode.HALF_UP);
            statutoryDeductions.put("ESI", esi);
        } else {
            statutoryDeductions.put("ESI", BigDecimal.ZERO);
        }
        
        // Professional Tax (state-specific, using Maharashtra rates as example)
        BigDecimal pt = calculateProfessionalTax(grossSalary);
        statutoryDeductions.put("PT", pt);
        
        return statutoryDeductions;
    }
    
    /**
     * Calculate Professional Tax (example for Maharashtra)
     */
    private BigDecimal calculateProfessionalTax(BigDecimal grossSalary) {
        if (grossSalary.compareTo(BigDecimal.valueOf(21000)) <= 0) {
            return BigDecimal.valueOf(175);
        } else {
            return BigDecimal.valueOf(200);
        }
    }
    
    /**
     * Result class for payroll calculations
     */
    public static class PayrollCalculationResult {
        private Long employeeId;
        private YearMonth payrollMonth;
        private BigDecimal basicSalary;
        private Map<String, BigDecimal> earnings;
        private Map<String, BigDecimal> deductions;
        private BigDecimal totalEarnings;
        private BigDecimal totalDeductions;
        private BigDecimal netSalary;
        
        // Getters and Setters
        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        
        public YearMonth getPayrollMonth() { return payrollMonth; }
        public void setPayrollMonth(YearMonth payrollMonth) { this.payrollMonth = payrollMonth; }
        
        public BigDecimal getBasicSalary() { return basicSalary; }
        public void setBasicSalary(BigDecimal basicSalary) { this.basicSalary = basicSalary; }
        
        public Map<String, BigDecimal> getEarnings() { return earnings; }
        public void setEarnings(Map<String, BigDecimal> earnings) { this.earnings = earnings; }
        
        public Map<String, BigDecimal> getDeductions() { return deductions; }
        public void setDeductions(Map<String, BigDecimal> deductions) { this.deductions = deductions; }
        
        public BigDecimal getTotalEarnings() { return totalEarnings; }
        public void setTotalEarnings(BigDecimal totalEarnings) { this.totalEarnings = totalEarnings; }
        
        public BigDecimal getTotalDeductions() { return totalDeductions; }
        public void setTotalDeductions(BigDecimal totalDeductions) { this.totalDeductions = totalDeductions; }
        
        public BigDecimal getNetSalary() { return netSalary; }
        public void setNetSalary(BigDecimal netSalary) { this.netSalary = netSalary; }
    }
}
