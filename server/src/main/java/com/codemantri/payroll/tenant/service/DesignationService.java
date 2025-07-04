package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.tenant.entity.DesignationEntity;
import com.codemantri.payroll.tenant.repository.DesignationRepository;
import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DesignationService {
    private final DesignationRepository designationRepository;

    public DesignationService(DesignationRepository designationRepository) {
        this.designationRepository = designationRepository;
    }

    public DesignationEntity createDesignation(DesignationEntity designation) {
        return designationRepository.save(designation);
    }

    public DesignationEntity updateDesignation(Long id, DesignationEntity designation) {
        DesignationEntity existingDesignation = getDesignationById(id);
        existingDesignation.setName(designation.getName());
        return designationRepository.save(existingDesignation);
    }

    public void deleteDesignation(Long id) {
        designationRepository.deleteById(id);
    }

    public DesignationEntity getDesignationById(Long id) {
        return designationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Designation not found"));
    }

    public List<DesignationEntity> getAllDesignations() {
        return designationRepository.findAll();
    }
}
