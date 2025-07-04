package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.dto.RegisterEmployeeDto;
import com.codemantri.payroll.tenant.entity.EmployeeEntity;
import com.codemantri.payroll.tenant.repository.EmployeeRepository;
import com.codemantri.payroll.tenant.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("register")
    public EmployeeEntity register(@RequestBody RegisterEmployeeDto dto){
        return employeeService.registerEmployee(dto);
    }

    @GetMapping("get/{employeeCode}")
    public EmployeeEntity get(@PathVariable Long employeeCode){
        return employeeService.getEmployeeByCode(employeeCode);
    }

    @GetMapping("get-all")
    public List<EmployeeEntity> getAll(){
        return employeeService.getAllEmployees();
    }
}
