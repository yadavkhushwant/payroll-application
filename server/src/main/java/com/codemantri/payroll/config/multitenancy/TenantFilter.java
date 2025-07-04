package com.codemantri.payroll.config.multitenancy;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class TenantFilter extends OncePerRequestFilter {

    private static final List<String> COMMON_ENDPOINTS = Arrays.asList(
            "/api/faqs", "/api/plans", "/api/configs"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String tenantId = request.getHeader("X-Tenant-ID");
        String path = request.getRequestURI();

        if (tenantId != null && COMMON_ENDPOINTS.stream().noneMatch(path::startsWith)) {
            TenantContext.setCurrentTenant(tenantId);
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }
}
