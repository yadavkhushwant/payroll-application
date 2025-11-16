package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import com.codemantri.payroll.tenant.entity.SalaryStructureEntity;
import com.codemantri.payroll.tenant.repository.SalaryStructureRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class SalaryStructureService {
    
    private final SalaryStructureRepository salaryStructureRepository;
    
    public SalaryStructureService(SalaryStructureRepository salaryStructureRepository) {
        this.salaryStructureRepository = salaryStructureRepository;
    }
    
    @Transactional("tenantTransactionManager")
    public SalaryStructureEntity createSalaryStructure(SalaryStructureEntity salaryStructure) {
        salaryStructure.setIsActive(true);
        return salaryStructureRepository.save(salaryStructure);
    }
    
    @Transactional("tenantTransactionManager")
    public SalaryStructureEntity updateSalaryStructure(Long id, SalaryStructureEntity salaryStructure) {
        SalaryStructureEntity existingStructure = getSalaryStructureById(id);
        existingStructure.setStructureName(salaryStructure.getStructureName());
        existingStructure.setDescription(salaryStructure.getDescription());
        existingStructure.setEffectiveFrom(salaryStructure.getEffectiveFrom());
        existingStructure.setEffectiveTo(salaryStructure.getEffectiveTo());
        existingStructure.setUpdatedBy(salaryStructure.getUpdatedBy());
        return salaryStructureRepository.save(existingStructure);
    }
    
    @Transactional("tenantTransactionManager")
    public SalaryStructureEntity deactivateSalaryStructure(Long id) {
        SalaryStructureEntity salaryStructure = getSalaryStructureById(id);
        salaryStructure.setIsActive(false);
        salaryStructure.setEffectiveTo(LocalDate.now());
        return salaryStructureRepository.save(salaryStructure);
    }
    
    public SalaryStructureEntity getSalaryStructureById(Long id) {
        return salaryStructureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Salary structure not found with id: " + id));
    }
    
    public List<SalaryStructureEntity> getAllActiveSalaryStructures() {
        return salaryStructureRepository.findAllActive();
    }
    
    public SalaryStructureEntity getSalaryStructureByName(String name) {
        return salaryStructureRepository.findByNameAndActive(name)
                .orElseThrow(() -> new ResourceNotFoundException("Salary structure not found with name: " + name));
    }
    
    public List<SalaryStructureEntity> getActiveSalaryStructuresOnDate(LocalDate date) {
        return salaryStructureRepository.findActiveOnDate(date);
    }
}
