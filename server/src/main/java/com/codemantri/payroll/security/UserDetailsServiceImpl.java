package com.codemantri.payroll.security;


import com.codemantri.payroll.common.repository.RolePermissionRepository;
import com.codemantri.payroll.common.repository.RoleRepository;
import com.codemantri.payroll.config.exception.ResourceNotFoundException;
import com.codemantri.payroll.tenant.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final RolePermissionRepository rolePermissionRepository;

    public UserDetailsServiceImpl(UserRepository userRepository, RoleRepository roleRepository, RolePermissionRepository rolePermissionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        var role = roleRepository.findById(user.getRoleId()).orElseThrow(() -> new ResourceNotFoundException("Invalid user role"));

        var rolePermissions = rolePermissionRepository.findByRoleId(user.getRoleId());
        var permissions = rolePermissions.stream().map(rolePermission -> rolePermission.getPermission().getName()).toArray(String[]::new);
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .disabled(!user.getIsActive())
                .authorities(permissions)
                .roles(role.getName())
                .build();
    }
}