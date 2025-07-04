package com.codemantri.payroll.tenant.service;

import com.codemantri.payroll.security.JwtUtil;
import com.codemantri.payroll.security.UserDetailsServiceImpl;
import com.codemantri.payroll.tenant.dto.LoginRequest;
import com.codemantri.payroll.tenant.dto.LoginResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Map;

@Service
public class AuthService {
    private final UserDetailsServiceImpl userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Value("${security.jwt.expiration-time}")
    private long cookieExpiry;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    public AuthService(UserDetailsServiceImpl userDetailsService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse handleGoogleCallback(String code) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String tokenEndpoint = "https://oauth2.googleapis.com/token";
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("code", code);
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("redirect_uri", "http://localhost:3000");
            params.add("grant_type", "authorization_code");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenEndpoint, request, Map.class);
            System.out.println("Token Response: " + tokenResponse);
            String idToken = (String) tokenResponse.getBody().get("id_token");
            System.out.println("Token Response idToken: " + idToken);
            String userInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
            ResponseEntity<Map> userInfoResponse = restTemplate.getForEntity(userInfoUrl, Map.class);
            System.out.println("userInfoResponse:  " + userInfoResponse);
            if (userInfoResponse.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> userInfo = userInfoResponse.getBody();
                String email = (String) userInfo.get("email");

                var user = userDetailsService.loadUserByUsername(email);
                String jwtToken = jwtUtil.generateToken(user.getUsername());

                return new LoginResponse(jwtToken);
            }
            throw new UsernameNotFoundException("User not found");
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Invalid code");
        }
    }

    public Map<String, Object> checkAuth(String token) {
        if (token == null || !jwtUtil.validateToken(token)) {
            throw new IllegalArgumentException("User is not authenticated");
        }
        String username = jwtUtil.extractUsername(token);
        return Map.of("username", username, "authenticated", true);
    }

    public LoginResponse login(LoginRequest request, HttpServletResponse response, HttpServletRequest req) {
        var user = userDetailsService.loadUserByUsername(request.getUsername());
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid Password");
        }
        var accessToken = jwtUtil.generateToken(user.getUsername());

        return generateLoginResponse(accessToken, response);
    }

    private LoginResponse generateLoginResponse(String token, HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(cookieExpiry)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new LoginResponse(token);
    }

    public String extractJwtFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return null;
        }

        return Arrays.stream(request.getCookies())
                .filter(cookie -> "accessToken".equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
