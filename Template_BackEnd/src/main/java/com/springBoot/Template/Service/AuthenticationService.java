package com.springBoot.Template.Service;

import com.springBoot.Template.Model.Enum.Role;
import com.springBoot.Template.Model.Login;
import com.springBoot.Template.Model.User;
import com.springBoot.Template.Repository.UserRepository;
import com.springBoot.Template.Security.JwtUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Optional;

@Service
@Configuration
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final UserRepository userRepository;
    private final  PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final  AuthenticationManager authenticationManager;

    public ResponseEntity<String> register(User user) {
        User student = new User();
        student.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null)
            user.setRole(Role.USER);
        userRepository.save(user);
        return new ResponseEntity<>("Registered Successfully...", HttpStatus.CREATED);
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

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + email));
    }

}
