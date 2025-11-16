package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import com.codemantri.payroll.tenant.entity.LoanTypeEntity;
import com.codemantri.payroll.tenant.repository.LoanTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LoanTypeService {
    
    private final LoanTypeRepository loanTypeRepository;
    
    public LoanTypeService(LoanTypeRepository loanTypeRepository) {
        this.loanTypeRepository = loanTypeRepository;
    }
    
    @Transactional("tenantTransactionManager")
    public LoanTypeEntity createLoanType(LoanTypeEntity loanType) {
        loanType.setIsActive(true);
        return loanTypeRepository.save(loanType);
    }
    
    @Transactional("tenantTransactionManager")
    public LoanTypeEntity updateLoanType(Long id, LoanTypeEntity loanType) {
        LoanTypeEntity existing = getLoanTypeById(id);
        existing.setTypeName(loanType.getTypeName());
        existing.setDescription(loanType.getDescription());
        existing.setMaxAmountAllowed(loanType.getMaxAmountAllowed());
        existing.setMaxInstallments(loanType.getMaxInstallments());
        existing.setDefaultInterestRate(loanType.getDefaultInterestRate());
        existing.setRequiresApproval(loanType.getRequiresApproval());
        existing.setIsAdvanceType(loanType.getIsAdvanceType());
        existing.setEligibilityMonths(loanType.getEligibilityMonths());
        existing.setMaxOutstandingLoans(loanType.getMaxOutstandingLoans());
        existing.setDisplayOrder(loanType.getDisplayOrder());
        existing.setUpdatedBy(loanType.getUpdatedBy());
        return loanTypeRepository.save(existing);
    }
    
    @Transactional("tenantTransactionManager")
    public LoanTypeEntity deactivateLoanType(Long id) {
        LoanTypeEntity loanType = getLoanTypeById(id);
        loanType.setIsActive(false);
        return loanTypeRepository.save(loanType);
    }
    
    public LoanTypeEntity getLoanTypeById(Long id) {
        return loanTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan type not found with id: " + id));
    }
    
    public List<LoanTypeEntity> getAllActiveLoanTypes() {
        return loanTypeRepository.findAllActiveOrderByDisplayOrder();
    }
    
    public LoanTypeEntity getLoanTypeByCode(String code) {
        return loanTypeRepository.findByCodeAndActive(code)
                .orElseThrow(() -> new ResourceNotFoundException("Loan type not found with code: " + code));
    }
    
    public LoanTypeEntity getLoanTypeByName(String name) {
        return loanTypeRepository.findByNameAndActive(name)
                .orElseThrow(() -> new ResourceNotFoundException("Loan type not found with name: " + name));
    }
    
    public List<LoanTypeEntity> getAdvanceTypes() {
        return loanTypeRepository.findByAdvanceTypeAndActiveOrderByDisplayOrder(true);
    }
    
    public List<LoanTypeEntity> getLoanTypes() {
        return loanTypeRepository.findByAdvanceTypeAndActiveOrderByDisplayOrder(false);
    }
    
    public List<LoanTypeEntity> getLoanTypesWithoutApproval() {
        return loanTypeRepository.findByRequiresApprovalAndActiveOrderByDisplayOrder(false);
    }
}
