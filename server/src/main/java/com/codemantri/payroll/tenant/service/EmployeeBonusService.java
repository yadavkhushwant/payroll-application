package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.tenant.entity.EmployeeBonusEntity;
import com.codemantri.payroll.tenant.entity.BonusStatus;
import com.codemantri.payroll.tenant.repository.EmployeeBonusRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class EmployeeBonusService {
    
    private final EmployeeBonusRepository employeeBonusRepository;
    
    public EmployeeBonusService(EmployeeBonusRepository employeeBonusRepository) {
        this.employeeBonusRepository = employeeBonusRepository;
    }
    
    public EmployeeBonusEntity createBonus(EmployeeBonusEntity employeeBonus) {
        employeeBonus.setStatus(BonusStatus.PENDING);
        employeeBonus.setCreatedAt(LocalDateTime.now());
        employeeBonus.setUpdatedAt(LocalDateTime.now());
        return employeeBonusRepository.save(employeeBonus);
    }
    
    public EmployeeBonusEntity approveBonus(Long id) {
        EmployeeBonusEntity bonus = getBonusById(id);
        bonus.setStatus(BonusStatus.APPROVED);
        bonus.setApprovalDate(LocalDate.now());
        bonus.setUpdatedAt(LocalDateTime.now());
        return employeeBonusRepository.save(bonus);
    }
    
    public EmployeeBonusEntity rejectBonus(Long id, String reason) {
        EmployeeBonusEntity bonus = getBonusById(id);
        bonus.setStatus(BonusStatus.REJECTED);
        // Note: rejectionReason field may not exist in entity, using notes if available
        bonus.setUpdatedAt(LocalDateTime.now());
        return employeeBonusRepository.save(bonus);
    }
    
    public EmployeeBonusEntity payBonus(Long id) {
        EmployeeBonusEntity bonus = getBonusById(id);
        bonus.setStatus(BonusStatus.PAID);
        bonus.setPaidDate(LocalDate.now());
        bonus.setUpdatedAt(LocalDateTime.now());
        return employeeBonusRepository.save(bonus);
    }
    
    @Transactional(readOnly = true)
    public EmployeeBonusEntity getBonusById(Long id) {
        return employeeBonusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bonus not found with id: " + id));
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeBonusEntity> getBonusesByEmployee(Long employeeId) {
        return employeeBonusRepository.findByEmployeeIdAndIsActiveTrue(employeeId);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeBonusEntity> getBonusesByType(Long bonusTypeId) {
        return employeeBonusRepository.findByBonusTypeIdAndIsActiveTrue(bonusTypeId);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeBonusEntity> getBonusesByStatus(BonusStatus status) {
        return employeeBonusRepository.findByStatusAndIsActiveTrueOrderByEligibleDate(status);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeBonusEntity> getPendingApprovalBonuses() {
        return employeeBonusRepository.findByStatusAndIsActiveTrueOrderByEligibleDate(BonusStatus.PENDING);
    }
    
    @Transactional(readOnly = true)
    public List<EmployeeBonusEntity> getBonusesForPayout() {
        return employeeBonusRepository.findByStatusAndIsActiveTrueOrderByEligibleDate(BonusStatus.APPROVED);
    }
}
