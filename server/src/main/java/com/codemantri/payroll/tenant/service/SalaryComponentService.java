package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import com.codemantri.payroll.tenant.entity.ComponentType;
import com.codemantri.payroll.tenant.entity.SalaryComponentEntity;
import com.codemantri.payroll.tenant.repository.SalaryComponentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SalaryComponentService {
    
    private final SalaryComponentRepository salaryComponentRepository;
    
    public SalaryComponentService(SalaryComponentRepository salaryComponentRepository) {
        this.salaryComponentRepository = salaryComponentRepository;
    }
    
    @Transactional("tenantTransactionManager")
    public SalaryComponentEntity createSalaryComponent(SalaryComponentEntity salaryComponent) {
        salaryComponent.setIsActive(true);
        return salaryComponentRepository.save(salaryComponent);
    }
    
    @Transactional("tenantTransactionManager")
    public SalaryComponentEntity updateSalaryComponent(Long id, SalaryComponentEntity salaryComponent) {
        SalaryComponentEntity existingComponent = getSalaryComponentById(id);
        existingComponent.setComponentName(salaryComponent.getComponentName());
        existingComponent.setComponentCode(salaryComponent.getComponentCode());
        existingComponent.setComponentType(salaryComponent.getComponentType());
        existingComponent.setCalculationType(salaryComponent.getCalculationType());
        existingComponent.setIsTaxable(salaryComponent.getIsTaxable());
        existingComponent.setIsStatutory(salaryComponent.getIsStatutory());
        existingComponent.setDefaultValue(salaryComponent.getDefaultValue());
        existingComponent.setFormula(salaryComponent.getFormula());
        existingComponent.setDisplayOrder(salaryComponent.getDisplayOrder());
        existingComponent.setUpdatedBy(salaryComponent.getUpdatedBy());
        return salaryComponentRepository.save(existingComponent);
    }
    
    @Transactional("tenantTransactionManager")
    public SalaryComponentEntity deactivateSalaryComponent(Long id) {
        SalaryComponentEntity salaryComponent = getSalaryComponentById(id);
        salaryComponent.setIsActive(false);
        return salaryComponentRepository.save(salaryComponent);
    }
    
    public SalaryComponentEntity getSalaryComponentById(Long id) {
        return salaryComponentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Salary component not found with id: " + id));
    }
    
    public List<SalaryComponentEntity> getAllActiveSalaryComponents() {
        return salaryComponentRepository.findAllActiveOrderByDisplayOrder();
    }
    
    public List<SalaryComponentEntity> getSalaryComponentsByType(ComponentType type) {
        return salaryComponentRepository.findByTypeAndActiveOrderByDisplayOrder(type);
    }
    
    public SalaryComponentEntity getSalaryComponentByCode(String code) {
        return salaryComponentRepository.findByCodeAndActive(code)
                .orElseThrow(() -> new ResourceNotFoundException("Salary component not found with code: " + code));
    }
    
    public List<SalaryComponentEntity> getStatutoryComponents() {
        return salaryComponentRepository.findStatutoryComponentsActive();
    }
}
