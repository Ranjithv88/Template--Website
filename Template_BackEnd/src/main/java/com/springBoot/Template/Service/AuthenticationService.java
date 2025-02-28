package com.springBoot.Template.Service;

import com.springBoot.Template.Model.*;
import com.springBoot.Template.Model.Enum.Role;
import com.springBoot.Template.Repository.LogoutRepository;
import com.springBoot.Template.Repository.UserRepository;
import com.springBoot.Template.Security.BlockedList;
import com.springBoot.Template.Security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

// Authentication Service Class
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    // Repository Class Dependency
    private final UserRepository userRepository;
    private final LogoutRepository logoutRepository;
    private final  PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final BlockedList blockedList;

    // Register Services Method
    public ResponseEntity<String> register(Register data) {
        try {
            boolean userNameExist = userRepository.existsByUserName(data.getUserName());
            if (!userNameExist) {
                Cart cart = Cart.builder()
                        .userName(data.getUserName())
                        .build();
                User newUser = User.builder()
                    .userName(data.getUserName())
                    .password(passwordEncoder.encode(data.getPassword()))
                    .age(data.getAge())
                    .email(data.getEmail())
                    .emailStatus(false)
                    .phoneNumber(data.getPhoneNumber())
                    .phoneNumberStatus(false)
                    .createdOn(new Date(System.currentTimeMillis()))
                    .modifyingDate(new Date(System.currentTimeMillis()))
                    .role(Role.USER)
                    .cart(cart)
                .build();
                userRepository.save(newUser);
                return ResponseEntity.status(HttpStatus.CREATED).body("Registered Successfully...!");
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("That UserName is taken, Try another...!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went wrong, please try again later....!");
        }
    }

    // Login Services Method
    public ResponseEntity<?> login(Login data) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(data.getUserName(), data.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UserName and Password are invalid.");
        }
        Optional<User> userOpt = userRepository.findByUserName(data.getUserName());
        if (userOpt.isPresent()) {
            String token = jwtUtils.generateToken(new HashMap<>(), userOpt.get());
            if (token == null) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    // LogOut Services Method
    public ResponseEntity<String> logOut (String token) {
        blockedList.checked();
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        boolean tokenExist = logoutRepository.existsByToken(token);
        if (!tokenExist) {
            LogOut logOut = LogOut.builder()
                    .userName(userName)
                    .token(token)
                    .createdOn(new Date(System.currentTimeMillis()))
                    .build();
            logoutRepository.save(logOut);
            return ResponseEntity.status(HttpStatus.CREATED).body("To add BlockList Token Successfully.......!");
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Token Is Already Exists......!");
    }

}

