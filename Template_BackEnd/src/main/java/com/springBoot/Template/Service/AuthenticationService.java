package com.springBoot.Template.Service;

import com.springBoot.Template.Model.Enum.Role;
import com.springBoot.Template.Model.Login;
import com.springBoot.Template.Model.User;
import com.springBoot.Template.Repository.UserRepository;
import com.springBoot.Template.Security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    private final UserRepository userRepository;
    private final  PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<String> register(User user) {
        try {
            boolean emailExist = userRepository.existsByEmail(user.getEmail());
            boolean numberExist = userRepository.existsByPhoneNumber(user.getPhoneNumber());
            if (!emailExist) {
                if (!numberExist) {
                    user.setCreatedOn(new Date(System.currentTimeMillis()));
                    user.setRole(Role.USER);
                    userRepository.save(user);
                    return ResponseEntity.status(HttpStatus.CREATED).body("Registered Successfully...!");
                } else {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("That PhoneNumber is taken. Try another...!");
                }
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("That Email is taken, Try another...!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went wrong, please try again later....!");
        }
    }

    public ResponseEntity<?> login(Login login) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UserName and Password are invalid.");
        }
        Optional<User> userOpt = userRepository.findByEmail(login.getEmail());
        if (userOpt.isPresent()) {
            String token = jwtUtils.generateToken(new HashMap<>(), userOpt.get());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

}

