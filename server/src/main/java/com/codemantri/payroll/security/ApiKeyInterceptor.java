package com.codemantri.payroll.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//@Component
//public class ApiKeyInterceptor implements HandlerInterceptor {
//    @Value("${api.key}")
//    private String validApiKey;
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
//        String requestApiKey = request.getHeader("X-API-KEY");
//        if (requestApiKey == null || !requestApiKey.equals(validApiKey)) {
//            response.setStatus(HttpStatus.FORBIDDEN.value());
//            return false;
//        }
//        return true;
//    }
//}
