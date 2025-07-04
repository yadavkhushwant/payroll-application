package com.codemantri.payroll.common.controller;

import com.codemantri.payroll.common.dto.BusinessDatabaseDto;
import com.codemantri.payroll.common.dto.RegisterBusinessAdminDto;
import com.codemantri.payroll.common.dto.RegisterBusinessDto;
import com.codemantri.payroll.common.entity.BusinessEntity;
import com.codemantri.payroll.common.service.BusinessService;
import com.codemantri.payroll.tenant.entity.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {
    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @PostMapping("/register")
    public ResponseEntity<BusinessEntity> registerBusiness(@RequestBody RegisterBusinessDto dto){
        var businessEntity = businessService.registerBusiness(dto);
        return ResponseEntity.ok(businessEntity);
    }

    @PostMapping("/setup-db")
    public ResponseEntity<BusinessEntity> setupBusinessDatabase(@RequestBody BusinessDatabaseDto dto){
        var businessEntity = businessService.setupBusinessDatabase(dto);
        return ResponseEntity.ok(businessEntity);
    }

    @PostMapping("/create-admin-user")
    public ResponseEntity<UserEntity> createAdminUser(@RequestBody RegisterBusinessAdminDto dto){
        var user = businessService.createBusinessAdminUser(dto);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BusinessEntity>> getAllBusinesses(){
        return ResponseEntity.ok(businessService.getAllBusinesses());
    }
}
