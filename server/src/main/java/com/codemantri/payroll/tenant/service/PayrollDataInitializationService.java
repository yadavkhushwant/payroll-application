package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.tenant.entity.*;
import com.codemantri.payroll.tenant.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class PayrollDataInitializationService {
    
    private final SalaryComponentRepository salaryComponentRepository;
    private final SalaryStructureRepository salaryStructureRepository;
    private final SalaryStructureComponentRepository salaryStructureComponentRepository;
    private final EmployeeRepository employeeRepository;
    private final EmployeeSalaryRepository employeeSalaryRepository;
    
    public PayrollDataInitializationService(
            SalaryComponentRepository salaryComponentRepository,
            SalaryStructureRepository salaryStructureRepository,
            SalaryStructureComponentRepository salaryStructureComponentRepository,
            EmployeeRepository employeeRepository,
            EmployeeSalaryRepository employeeSalaryRepository) {
        this.salaryComponentRepository = salaryComponentRepository;
        this.salaryStructureRepository = salaryStructureRepository;
        this.salaryStructureComponentRepository = salaryStructureComponentRepository;
        this.employeeRepository = employeeRepository;
        this.employeeSalaryRepository = employeeSalaryRepository;
    }
    
    @Transactional("tenantTransactionManager")
    public void initializeDefaultSalaryStructure() {
        // Check if default structure already exists
        if (salaryStructureRepository.findByNameAndActive("Standard Structure").isPresent()) {
            return;
        }
        
        // Create default salary structure
        SalaryStructureEntity defaultStructure = new SalaryStructureEntity();
        defaultStructure.setStructureName("Standard Structure");
        defaultStructure.setDescription("Default salary structure for all employees");
        defaultStructure.setEffectiveFrom(LocalDate.now());
        defaultStructure.setIsActive(true);
        defaultStructure.setCreatedBy("SYSTEM");
        
        SalaryStructureEntity savedStructure = salaryStructureRepository.save(defaultStructure);
        
        // Get default components and add them to structure
        addDefaultComponentsToStructure(savedStructure);
    }
    
    private void addDefaultComponentsToStructure(SalaryStructureEntity structure) {
        // Add Basic Salary component
        addComponentToStructure(structure, "BASIC", BigDecimal.valueOf(100), false, null);
        
        // Add HRA (50% of basic)
        addComponentToStructure(structure, "HRA", BigDecimal.valueOf(50), true, PercentageBase.BASIC);
        
        // Add Medical Allowance
        addComponentToStructure(structure, "MEDICAL", BigDecimal.valueOf(1250), false, null);
        
        // Add Transport Allowance
        addComponentToStructure(structure, "TRANSPORT", BigDecimal.valueOf(1600), false, null);
        
        // Add PF Deduction (12% of basic)
        addComponentToStructure(structure, "PF", BigDecimal.valueOf(12), true, PercentageBase.BASIC);
        
        // Add Professional Tax
        addComponentToStructure(structure, "PT", BigDecimal.valueOf(200), false, null);
    }
    
    private void addComponentToStructure(SalaryStructureEntity structure, String componentCode, 
                                       BigDecimal value, boolean isPercentage, PercentageBase percentageBase) {
        
        SalaryComponentEntity component = salaryComponentRepository.findByCodeAndActive(componentCode)
                .orElse(null);
        
        if (component != null) {
            SalaryStructureComponentEntity structureComponent = new SalaryStructureComponentEntity();
            structureComponent.setSalaryStructure(structure);
            structureComponent.setComponent(component);
            structureComponent.setComponentValue(value);
            structureComponent.setIsPercentage(isPercentage);
            structureComponent.setPercentageBase(percentageBase);
            structureComponent.setIsActive(true);
            structureComponent.setCreatedBy("SYSTEM");
            
            salaryStructureComponentRepository.save(structureComponent);
        }
    }
    
    @Transactional("tenantTransactionManager")
    public void assignDefaultSalaryToEmployee(Long employeeId, BigDecimal basicSalary) {
        EmployeeEntity employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        SalaryStructureEntity defaultStructure = salaryStructureRepository.findByNameAndActive("Standard Structure")
                .orElseThrow(() -> new RuntimeException("Default salary structure not found"));
        
        EmployeeSalaryEntity employeeSalary = new EmployeeSalaryEntity();
        employeeSalary.setEmployee(employee);
        employeeSalary.setSalaryStructure(defaultStructure);
        employeeSalary.setBasicSalary(basicSalary);
        employeeSalary.setEffectiveFrom(LocalDate.now());
        employeeSalary.setIsActive(true);
        employeeSalary.setCreatedBy("SYSTEM");
        
        // Calculate gross salary (basic + allowances)
        BigDecimal grossSalary = calculateGrossSalary(basicSalary);
        employeeSalary.setGrossSalary(grossSalary);
        employeeSalary.setCtc(grossSalary);
        
        employeeSalaryRepository.save(employeeSalary);
    }
    
    private BigDecimal calculateGrossSalary(BigDecimal basicSalary) {
        // Basic + HRA(50%) + Medical(1250) + Transport(1600)
        BigDecimal hra = basicSalary.multiply(BigDecimal.valueOf(0.50));
        BigDecimal medical = BigDecimal.valueOf(1250);
        BigDecimal transport = BigDecimal.valueOf(1600);
        
        return basicSalary.add(hra).add(medical).add(transport);
    }
}
