package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.tenant.entity.DepartmentEntity;
import com.codemantri.payroll.tenant.repository.DepartmentRepository;
import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public DepartmentEntity createDepartment(DepartmentEntity department) {
        return departmentRepository.save(department);
    }

    public DepartmentEntity updateDepartment(Long id, DepartmentEntity department) {
        DepartmentEntity existingDepartment = getDepartmentById(id);
        existingDepartment.setName(department.getName());
        return departmentRepository.save(existingDepartment);
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }

    public DepartmentEntity getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));
    }

    public List<DepartmentEntity> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
