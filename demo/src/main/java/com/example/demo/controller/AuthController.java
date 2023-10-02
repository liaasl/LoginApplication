package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AuthService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        String userId = loginUser.getUserId();
        String password = loginUser.getPassword();

        var user = authService.authenticate(userId, password);
        if (user.isPresent()) {
            System.out.println("Authentication successful for user: " + userId);
            return ResponseEntity.ok(user.get());
        } else {
            System.out.println("Authentication failed for user: " + userId);
            if (userRepository.findByUserId(userId).isPresent()) {
                return ResponseEntity.status(401).body("Invalid Password");
            } else {
                return ResponseEntity.status(401).body("Invalid User ID");
            }
        }
    }
}

