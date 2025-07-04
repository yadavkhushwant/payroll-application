package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.tenant.dto.RegisterEmployeeDto;
import com.codemantri.payroll.tenant.entity.EmployeeEntity;
import com.codemantri.payroll.tenant.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public EmployeeService(EmployeeRepository employeeRepository, UserService userService, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Transactional("tenantTransactionManager") // 👈 Ensures rollback on failure
    public EmployeeEntity registerEmployee(RegisterEmployeeDto dto) {
        var employeeEntity = modelMapper.map(dto, EmployeeEntity.class);
        var userEntity = userService.registerUser(dto);
        employeeEntity.setUser(userEntity);

        Long lastEmployeeCode = employeeRepository.findMaxEmployeeCode();
        if (lastEmployeeCode == null) {
            lastEmployeeCode = 10000L;
        }
        employeeEntity.setEmployeeCode(lastEmployeeCode + 1);

        return employeeRepository.save(employeeEntity);
    }

    public EmployeeEntity getEmployeeByCode(Long employeeCode) {
        return employeeRepository.findByEmployeeCode(employeeCode)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public List<EmployeeEntity> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
