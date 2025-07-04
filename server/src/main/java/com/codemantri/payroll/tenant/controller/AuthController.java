package com.codemantri.payroll.tenant.controller;

import com.codemantri.payroll.tenant.dto.LoginRequest;
import com.codemantri.payroll.tenant.dto.LoginResponse;
import com.codemantri.payroll.tenant.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/api/auth")
@RestController
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response, HttpServletRequest req){
        var loginResponse = authService.login(request, response,req);
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/google/callback")
    public ResponseEntity<LoginResponse> googleCallback(@RequestParam String code) {
        var loginResponse = authService.handleGoogleCallback(code);
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/me")
    public ResponseEntity<?> checkAuth(@CookieValue(name = "accessToken", required = false) String token) {
        return ResponseEntity.ok(authService.checkAuth(token));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("accessToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0) // Expire the cookie immediately
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
