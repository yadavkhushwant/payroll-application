package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.common.repository.RoleRepository;
import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import com.codemantri.payroll.tenant.dto.RegisterUserDto;
import com.codemantri.payroll.tenant.entity.UserEntity;
import com.codemantri.payroll.tenant.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity registerUser(RegisterUserDto registerUserDto) {
        var userEntity = modelMapper.map(registerUserDto, UserEntity.class);
        roleRepository.findActiveRoleById(registerUserDto.getRoleId())
                .orElseThrow(()-> new ResourceNotFoundException("Role not found"));

        userEntity.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        return userRepository.save(userEntity);
    }
}
