package com.springBoot.Template.Service;

import com.springBoot.Template.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

// UserDetailsService for Spring Security
@Configuration
@RequiredArgsConstructor
public class UserDetailsServiceConfiguration implements UserDetailsService {

    // Repository Class Dependency
    private final UserRepository repository;

    // Check UserName For DataBase For Spring Security
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return repository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userName));
    }

}

