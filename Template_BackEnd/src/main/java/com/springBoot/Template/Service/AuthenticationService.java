package com.springBoot.Template.Service;

import com.springBoot.Template.Model.Enum.Role;
import com.springBoot.Template.Model.LogOut;
import com.springBoot.Template.Model.Login;
import com.springBoot.Template.Model.Register;
import com.springBoot.Template.Model.User;
import com.springBoot.Template.Repository.LogoutRepository;
import com.springBoot.Template.Repository.UserRepository;
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

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final LogoutRepository logoutRepository;
    private final  PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<String> register(Register data) {
        try {
            boolean userNameExist = userRepository.existsByUserName(data.getUserName());
            if (!userNameExist) {
                    User newUser = User.builder()
                        .userName(data.getUserName())
                        .password(passwordEncoder.encode(data.getPassword()))
                        .age(data.getAge())
                        .email(data.getEmail())
                        .phoneNumber(data.getPhoneNumber())
                        .createdOn(new Date(System.currentTimeMillis()))
                        .role(Role.USER)
                            .build();
                    userRepository.save(newUser);
                    return ResponseEntity.status(HttpStatus.CREATED).body("Registered Successfully...!");
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("That UserName is taken, Try another...!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went wrong, please try again later....!");
        }
    }

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

    public ResponseEntity<String> logOut (String token) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        LogOut logOut = LogOut.builder()
                .userName(userName)
                .token(token)
                .createdOn(new Date(System.currentTimeMillis()))
                .build();
        logoutRepository.save(logOut);
        return ResponseEntity.status(200).body(" Token add BlockList Successfully.......! ");
    }

}

