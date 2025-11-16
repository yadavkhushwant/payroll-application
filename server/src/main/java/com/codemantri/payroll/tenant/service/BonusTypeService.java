package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import com.codemantri.payroll.tenant.entity.BonusTypeEntity;
import com.codemantri.payroll.tenant.entity.BonusFrequency;
import com.codemantri.payroll.tenant.repository.BonusTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BonusTypeService {
    
    private final BonusTypeRepository bonusTypeRepository;
    
    public BonusTypeService(BonusTypeRepository bonusTypeRepository) {
        this.bonusTypeRepository = bonusTypeRepository;
    }
    
    @Transactional("tenantTransactionManager")
    public BonusTypeEntity createBonusType(BonusTypeEntity bonusType) {
        bonusType.setIsActive(true);
        return bonusTypeRepository.save(bonusType);
    }
    
    @Transactional("tenantTransactionManager")
    public BonusTypeEntity updateBonusType(Long id, BonusTypeEntity bonusType) {
        BonusTypeEntity existing = getBonusTypeById(id);
        existing.setTypeName(bonusType.getTypeName());
        existing.setDescription(bonusType.getDescription());
        existing.setCalculationBase(bonusType.getCalculationBase());
        existing.setDefaultPercentage(bonusType.getDefaultPercentage());
        existing.setDefaultAmount(bonusType.getDefaultAmount());
        existing.setIsTaxable(bonusType.getIsTaxable());
        existing.setIsAnnual(bonusType.getIsAnnual());
        existing.setRequiresApproval(bonusType.getRequiresApproval());
        existing.setRequiresPerformanceRating(bonusType.getRequiresPerformanceRating());
        existing.setEligibilityMonths(bonusType.getEligibilityMonths());
        existing.setFrequency(bonusType.getFrequency());
        existing.setDisplayOrder(bonusType.getDisplayOrder());
        existing.setUpdatedBy(bonusType.getUpdatedBy());
        return bonusTypeRepository.save(existing);
    }
    
    @Transactional("tenantTransactionManager")
    public BonusTypeEntity deactivateBonusType(Long id) {
        BonusTypeEntity bonusType = getBonusTypeById(id);
        bonusType.setIsActive(false);
        return bonusTypeRepository.save(bonusType);
    }
    
    public BonusTypeEntity getBonusTypeById(Long id) {
        return bonusTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bonus type not found with id: " + id));
    }
    
    public List<BonusTypeEntity> getAllActiveBonusTypes() {
        return bonusTypeRepository.findAllActiveOrderByDisplayOrder();
    }
    
    public BonusTypeEntity getBonusTypeByCode(String code) {
        return bonusTypeRepository.findByCodeAndActive(code)
                .orElseThrow(() -> new ResourceNotFoundException("Bonus type not found with code: " + code));
    }
    
    public BonusTypeEntity getBonusTypeByName(String name) {
        return bonusTypeRepository.findByNameAndActive(name)
                .orElseThrow(() -> new ResourceNotFoundException("Bonus type not found with name: " + name));
    }
    
    public List<BonusTypeEntity> getBonusTypesByFrequency(BonusFrequency frequency) {
        return bonusTypeRepository.findByFrequencyAndActiveOrderByDisplayOrder(frequency);
    }
    
    public List<BonusTypeEntity> getAnnualBonusTypes() {
        return bonusTypeRepository.findByAnnualAndActiveOrderByDisplayOrder(true);
    }
    
    public List<BonusTypeEntity> getPerformanceBasedBonusTypes() {
        return bonusTypeRepository.findByPerformanceRatingRequiredAndActiveOrderByDisplayOrder(true);
    }
}
