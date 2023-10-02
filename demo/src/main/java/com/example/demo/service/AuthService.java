package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> authenticate(String userId, String password) {

        Optional<User> user = userRepository.findByUserId(userId);
        if (user.isPresent()) {
            // System.out.println("user found: " + user.get().getUserId());
            if (user.get().getPassword().equals(password)) {
                System.out.println("Password is correct");
                return user;
            } else {
                System.out.println("Password is incorrect");
            }
        } else {
            System.out.println("User Not Found");
        }
        return Optional.empty();
    }
}
