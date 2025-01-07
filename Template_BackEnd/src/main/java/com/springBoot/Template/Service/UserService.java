package com.springBoot.Template.Service;

import com.springBoot.Template.Model.UpdateUser;
import com.springBoot.Template.Model.User;
import com.springBoot.Template.Repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    public ResponseEntity<Map<String, Object>> getUserService (String userName) {
        User userDetails = repository.findByUserDetails(userName);
        Map<String, Object> response = Map.of("userName", userDetails.getUsername(),"age", userDetails.getAge(),"email", userDetails.getEmail(),"phoneNumber", userDetails.getPhoneNumber());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<String> updateUserDetails ( UpdateUser updatedUser ) {
        Optional<User> userDetails = repository.findByUserName(updatedUser.getUserName());
        if (userDetails.isPresent()) {
            User existingUser = userDetails.get();
            existingUser.setAge(updatedUser.getAge());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setModifyingDate(new Date(System.currentTimeMillis()));
            repository.save(existingUser);
            return new ResponseEntity<>("User Update Successfully .....!",HttpStatusCode.valueOf(200));
        } else {
            return new ResponseEntity<>("User Not Found ....!",HttpStatusCode.valueOf(409));
        }
    }

}

