package com.springBoot.Template.Security;

import com.springBoot.Template.Exception.AuthEntryPoint;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {

    private AuthenticationFilter authenticationFilter;
    private AuthEntryPoint authenticationEntryPoint;
    private AuthenticationProvider authenticationProvider;

    private final String[] guest = {"/login","/register","/test"};
    private final String[] user = {"/user/**"};
    private final String[] admin = {"/admin/**"};

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        List<String> developerPaths = new ArrayList<>();
        developerPaths.addAll(Arrays.asList(guest));
        developerPaths.addAll(Arrays.asList(user));
        developerPaths.addAll(Arrays.asList(admin));
        String[] developer = developerPaths.toArray(new String[0]);

        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception->exception.authenticationEntryPoint(authenticationEntryPoint))
                .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authentication->
                        authentication.requestMatchers(guest).permitAll()
                                .requestMatchers(user).hasAuthority("USER")
                                .requestMatchers(admin).hasAuthority("ADMIN")
                                .requestMatchers(developer).hasAuthority("DEVELOPER")
                );
        httpSecurity.authenticationProvider(authenticationProvider);
        httpSecurity.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();

    }

}

