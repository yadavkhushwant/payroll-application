package com.codemantri.payroll.tenant.dto;

import java.time.LocalDate;
import java.util.List;

public class PayrollSummaryDto {
    private Long employeeId;
    private String employeeName;
    private int month;
    private int year;
    private LocalDate payrollDate;
    
    // Basic Salary Components
    private Double basicSalary;
    private Double grossSalary;
    
    // Earnings
    private Double totalEarnings;
    private List<ComponentDto> earningComponents;
    
    // Deductions
    private Double totalDeductions;
    private List<ComponentDto> deductionComponents;
    
    // Loan Deductions
    private Double totalLoanDeductions;
    private List<LoanDeductionDto> loanDeductions;
    
    // Bonuses
    private Double totalBonuses;
    private List<BonusDto> bonuses;
    
    // Statutory Deductions
    private Double providentFund;
    private Double professionalTax;
    private Double incomeTax;
    private Double esiDeduction;
    
    // Net Salary
    private Double netSalary;
    
    // Constructors
    public PayrollSummaryDto() {}
    
    public PayrollSummaryDto(Long employeeId, String employeeName, int month, int year) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.month = month;
        this.year = year;
        this.payrollDate = LocalDate.now();
    }
    
    // Getters and Setters
    public Long getEmployeeId() {
        return employeeId;
    }
    
    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
    
    public String getEmployeeName() {
        return employeeName;
    }
    
    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
    
    public int getMonth() {
        return month;
    }
    
    public void setMonth(int month) {
        this.month = month;
    }
    
    public int getYear() {
        return year;
    }
    
    public void setYear(int year) {
        this.year = year;
    }
    
    public LocalDate getPayrollDate() {
        return payrollDate;
    }
    
    public void setPayrollDate(LocalDate payrollDate) {
        this.payrollDate = payrollDate;
    }
    
    public Double getBasicSalary() {
        return basicSalary;
    }
    
    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }
    
    public Double getGrossSalary() {
        return grossSalary;
    }
    
    public void setGrossSalary(Double grossSalary) {
        this.grossSalary = grossSalary;
    }
    
    public Double getTotalEarnings() {
        return totalEarnings;
    }
    
    public void setTotalEarnings(Double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }
    
    public List<ComponentDto> getEarningComponents() {
        return earningComponents;
    }
    
    public void setEarningComponents(List<ComponentDto> earningComponents) {
        this.earningComponents = earningComponents;
    }
    
    public Double getTotalDeductions() {
        return totalDeductions;
    }
    
    public void setTotalDeductions(Double totalDeductions) {
        this.totalDeductions = totalDeductions;
    }
    
    public List<ComponentDto> getDeductionComponents() {
        return deductionComponents;
    }
    
    public void setDeductionComponents(List<ComponentDto> deductionComponents) {
        this.deductionComponents = deductionComponents;
    }
    
    public Double getTotalLoanDeductions() {
        return totalLoanDeductions;
    }
    
    public void setTotalLoanDeductions(Double totalLoanDeductions) {
        this.totalLoanDeductions = totalLoanDeductions;
    }
    
    public List<LoanDeductionDto> getLoanDeductions() {
        return loanDeductions;
    }
    
    public void setLoanDeductions(List<LoanDeductionDto> loanDeductions) {
        this.loanDeductions = loanDeductions;
    }
    
    public Double getTotalBonuses() {
        return totalBonuses;
    }
    
    public void setTotalBonuses(Double totalBonuses) {
        this.totalBonuses = totalBonuses;
    }
    
    public List<BonusDto> getBonuses() {
        return bonuses;
    }
    
    public void setBonuses(List<BonusDto> bonuses) {
        this.bonuses = bonuses;
    }
    
    public Double getProvidentFund() {
        return providentFund;
    }
    
    public void setProvidentFund(Double providentFund) {
        this.providentFund = providentFund;
    }
    
    public Double getProfessionalTax() {
        return professionalTax;
    }
    
    public void setProfessionalTax(Double professionalTax) {
        this.professionalTax = professionalTax;
    }
    
    public Double getIncomeTax() {
        return incomeTax;
    }
    
    public void setIncomeTax(Double incomeTax) {
        this.incomeTax = incomeTax;
    }
    
    public Double getEsiDeduction() {
        return esiDeduction;
    }
    
    public void setEsiDeduction(Double esiDeduction) {
        this.esiDeduction = esiDeduction;
    }
    
    public Double getNetSalary() {
        return netSalary;
    }
    
    public void setNetSalary(Double netSalary) {
        this.netSalary = netSalary;
    }
    
    // Helper DTOs
    public static class ComponentDto {
        private String componentName;
        private String componentType;
        private Double amount;
        private String calculationBasis;
        
        public ComponentDto() {}
        
        public ComponentDto(String componentName, String componentType, Double amount, String calculationBasis) {
            this.componentName = componentName;
            this.componentType = componentType;
            this.amount = amount;
            this.calculationBasis = calculationBasis;
        }
        
        // Getters and Setters
        public String getComponentName() { return componentName; }
        public void setComponentName(String componentName) { this.componentName = componentName; }
        public String getComponentType() { return componentType; }
        public void setComponentType(String componentType) { this.componentType = componentType; }
        public Double getAmount() { return amount; }
        public void setAmount(Double amount) { this.amount = amount; }
        public String getCalculationBasis() { return calculationBasis; }
        public void setCalculationBasis(String calculationBasis) { this.calculationBasis = calculationBasis; }
    }
    
    public static class LoanDeductionDto {
        private Long loanId;
        private String loanType;
        private Double deductionAmount;
        private Double remainingBalance;
        private Integer remainingInstallments;
        
        public LoanDeductionDto() {}
        
        public LoanDeductionDto(Long loanId, String loanType, Double deductionAmount, 
                               Double remainingBalance, Integer remainingInstallments) {
            this.loanId = loanId;
            this.loanType = loanType;
            this.deductionAmount = deductionAmount;
            this.remainingBalance = remainingBalance;
            this.remainingInstallments = remainingInstallments;
        }
        
        // Getters and Setters
        public Long getLoanId() { return loanId; }
        public void setLoanId(Long loanId) { this.loanId = loanId; }
        public String getLoanType() { return loanType; }
        public void setLoanType(String loanType) { this.loanType = loanType; }
        public Double getDeductionAmount() { return deductionAmount; }
        public void setDeductionAmount(Double deductionAmount) { this.deductionAmount = deductionAmount; }
        public Double getRemainingBalance() { return remainingBalance; }
        public void setRemainingBalance(Double remainingBalance) { this.remainingBalance = remainingBalance; }
        public Integer getRemainingInstallments() { return remainingInstallments; }
        public void setRemainingInstallments(Integer remainingInstallments) { this.remainingInstallments = remainingInstallments; }
    }
    
    public static class BonusDto {
        private Long bonusId;
        private String bonusType;
        private Double bonusAmount;
        private String frequency;
        private String performanceRating;
        
        public BonusDto() {}
        
        public BonusDto(Long bonusId, String bonusType, Double bonusAmount, 
                       String frequency, String performanceRating) {
            this.bonusId = bonusId;
            this.bonusType = bonusType;
            this.bonusAmount = bonusAmount;
            this.frequency = frequency;
            this.performanceRating = performanceRating;
        }
        
        // Getters and Setters
        public Long getBonusId() { return bonusId; }
        public void setBonusId(Long bonusId) { this.bonusId = bonusId; }
        public String getBonusType() { return bonusType; }
        public void setBonusType(String bonusType) { this.bonusType = bonusType; }
        public Double getBonusAmount() { return bonusAmount; }
        public void setBonusAmount(Double bonusAmount) { this.bonusAmount = bonusAmount; }
        public String getFrequency() { return frequency; }
        public void setFrequency(String frequency) { this.frequency = frequency; }
        public String getPerformanceRating() { return performanceRating; }
        public void setPerformanceRating(String performanceRating) { this.performanceRating = performanceRating; }
    }
}
