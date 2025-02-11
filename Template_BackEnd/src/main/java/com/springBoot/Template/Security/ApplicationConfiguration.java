package com.springBoot.Template.Security;

import com.springBoot.Template.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

// Application Configuration for Spring Security
@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {

    // Repository Class Dependency
    private final UserRepository repository;

    // UserDetailsService method Check the UserName and Password in Database
    @Bean
    public UserDetailsService userDetailsService () {
        return username -> repository.findByUserName(username).orElseThrow(()->(new UsernameNotFoundException(" UserName Not Found ......! ")));
    }

    // this method Configuration PasswordEncoder
    @Bean
    public PasswordEncoder passwordEncoder (){
        return new BCryptPasswordEncoder();
    }

    // this method Configuration AuthenticationProvider
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider= new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // this method Configuration AuthenticationManager
    @Bean
    public AuthenticationManager Manager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}

