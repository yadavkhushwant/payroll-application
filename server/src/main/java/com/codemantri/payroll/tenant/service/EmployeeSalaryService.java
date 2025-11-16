package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import com.codemantri.payroll.tenant.entity.EmployeeSalaryEntity;
import com.codemantri.payroll.tenant.repository.EmployeeSalaryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmployeeSalaryService {
    
    private final EmployeeSalaryRepository employeeSalaryRepository;
    
    public EmployeeSalaryService(EmployeeSalaryRepository employeeSalaryRepository) {
        this.employeeSalaryRepository = employeeSalaryRepository;
    }
    
    @Transactional("tenantTransactionManager")
    public EmployeeSalaryEntity assignSalaryToEmployee(EmployeeSalaryEntity employeeSalary) {
        // Deactivate previous salary if exists
        List<EmployeeSalaryEntity> existingSalaries = employeeSalaryRepository
                .findByEmployeeIdAndActive(employeeSalary.getEmployee().getId());
        
        for (EmployeeSalaryEntity existing : existingSalaries) {
            if (existing.getEffectiveTo() == null || existing.getEffectiveTo().isAfter(employeeSalary.getEffectiveFrom())) {
                existing.setEffectiveTo(employeeSalary.getEffectiveFrom().minusDays(1));
                existing.setIsActive(false);
                employeeSalaryRepository.save(existing);
            }
        }
        
        employeeSalary.setIsActive(true);
        return employeeSalaryRepository.save(employeeSalary);
    }
    
    @Transactional("tenantTransactionManager")
    public EmployeeSalaryEntity updateEmployeeSalary(Long id, EmployeeSalaryEntity employeeSalary) {
        EmployeeSalaryEntity existingSalary = getEmployeeSalaryById(id);
        existingSalary.setSalaryStructure(employeeSalary.getSalaryStructure());
        existingSalary.setBasicSalary(employeeSalary.getBasicSalary());
        existingSalary.setGrossSalary(employeeSalary.getGrossSalary());
        existingSalary.setCtc(employeeSalary.getCtc());
        existingSalary.setEffectiveFrom(employeeSalary.getEffectiveFrom());
        existingSalary.setEffectiveTo(employeeSalary.getEffectiveTo());
        existingSalary.setRevisionReason(employeeSalary.getRevisionReason());
        existingSalary.setUpdatedBy(employeeSalary.getUpdatedBy());
        return employeeSalaryRepository.save(existingSalary);
    }
    
    @Transactional("tenantTransactionManager")
    public EmployeeSalaryEntity deactivateEmployeeSalary(Long id) {
        EmployeeSalaryEntity employeeSalary = getEmployeeSalaryById(id);
        employeeSalary.setIsActive(false);
        employeeSalary.setEffectiveTo(LocalDate.now());
        return employeeSalaryRepository.save(employeeSalary);
    }
    
    public EmployeeSalaryEntity getEmployeeSalaryById(Long id) {
        return employeeSalaryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee salary not found with id: " + id));
    }
    
    public List<EmployeeSalaryEntity> getEmployeeSalaryHistory(Long employeeId) {
        return employeeSalaryRepository.findByEmployeeIdAndActive(employeeId);
    }
    
    public EmployeeSalaryEntity getCurrentEmployeeSalary(Long employeeId) {
        return getCurrentEmployeeSalary(employeeId, LocalDate.now());
    }
    
    public EmployeeSalaryEntity getCurrentEmployeeSalary(Long employeeId, LocalDate asOfDate) {
        return employeeSalaryRepository.findCurrentSalary(employeeId, asOfDate)
                .orElseThrow(() -> new ResourceNotFoundException("No active salary found for employee: " + employeeId));
    }
    
    public EmployeeSalaryEntity getLatestEmployeeSalary(Long employeeId) {
        return employeeSalaryRepository.findLatestSalaryByEmployeeId(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("No salary found for employee: " + employeeId));
    }
    
    public List<EmployeeSalaryEntity> getEmployeesBySalaryStructure(Long structureId) {
        return employeeSalaryRepository.findBySalaryStructureIdAndActive(structureId);
    }
}
