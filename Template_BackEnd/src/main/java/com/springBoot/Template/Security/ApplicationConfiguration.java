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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfiguration {

    private final UserRepository repository;

    @Bean
    public UserDetailsService userDetailsService () {
        return username -> repository.findByUserName(username).orElseThrow(()->(new UsernameNotFoundException(" UserName Not Found ......! ")));
    }

    @Bean
    public PasswordEncoder passwordEncoder (){
        return new SCryptPasswordEncoder(16384, 8, 1, 32, 64);
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider= new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager Manager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}

