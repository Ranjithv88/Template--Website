package com.springBoot.Template.Service;

import com.springBoot.Template.Model.User;
import com.springBoot.Template.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    public ResponseEntity<Map<String, Object>> getUserService (String userName) {
        User userDetails = repository.findByUserDetails(userName);
        Map<String, Object> response = Map.of("userName", userDetails.getUsername(),"age", userDetails.getAge(),"email", userDetails.getEmail(),"phoneNumber", userDetails.getPhoneNumber());
        return ResponseEntity.ok(response);
    }

}

