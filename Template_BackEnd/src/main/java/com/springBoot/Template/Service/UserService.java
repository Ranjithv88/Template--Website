package com.springBoot.Template.Service;

import com.springBoot.Template.Model.UpdateUser;
import com.springBoot.Template.Model.User;
import com.springBoot.Template.Repository.UserRepository;
import com.springBoot.Template.Security.OTPServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Log
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    public final OTPServices otpServices;

    @Cacheable(value = "user", key = "#userName")
    public ResponseEntity<Map<String, Object>> getUserService (String userName) {
        User userDetails = repository.findByUserDetails(userName);
        Map<String, Object> response = Map.of("userName", userDetails.getUsername(),"age", userDetails.getAge(),"email", userDetails.getEmail(),"phoneNumber", userDetails.getPhoneNumber(), "emailStatus", userDetails.isEmailStatus(), "phoneNumberStatus", userDetails.isPhoneNumberStatus(), "cart", userDetails.getCart());
        return ResponseEntity.ok(response);
    }

    @CacheEvict(value = "user", key = "#updatedUser.getUserName()")
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

    public ResponseEntity<String> otpService (String data) {
        Optional<User> userDetails = repository.findByUserName(data);
        if (userDetails.isPresent()) {
            User existingUser = userDetails.get();
            if(!existingUser.isEmailStatus()) {
                String otp = otpServices.generateOTP(data);
                String to = existingUser.getEmail();
                try {
                    ProcessBuilder processBuilder = new ProcessBuilder("node", "sendEmail.js", to, otp);
                    processBuilder.directory(new java.io.File("./src/main/java/com/springBoot/Template/JavaScript"));
                    Process process = processBuilder.start();
                    BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                    StringBuilder output = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        output.append(line).append("\n");
                    }
                    BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
                    while ((line = errorReader.readLine()) != null) {
                        output.append("ERROR: ").append(line).append("\n");
                    }
                    process.waitFor();
                    log.info(output.toString());
                    if (process.exitValue() == 0 && output.toString().startsWith("Email sent:"))
                        return ResponseEntity.ok("Email sent successfully!");
                    else if(output.toString().startsWith("ERROR: "))
                        return new ResponseEntity<>("Error sending email : "+output, HttpStatus.INTERNAL_SERVER_ERROR);
                    else
                        return new ResponseEntity<>("Error sending email", HttpStatus.INTERNAL_SERVER_ERROR);
                } catch(Exception e) {
                    log.info(e.toString());
                    return new ResponseEntity<>("Error sending email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else
                return new ResponseEntity<>("User is already verified!", HttpStatus.CONFLICT);
        }else
            return new ResponseEntity<>("User Not Found ....!",HttpStatusCode.valueOf(409));
    }

    public ResponseEntity<String> otpTestService(String data, String otp) {
        Optional<User> userDetails = repository.findByUserName(data);
        if(userDetails.isPresent()) {
            if(otpServices.validateOTP(data, otp)) {
                User existingUser = userDetails.get();
                existingUser.setEmailStatus(true);
                repository.save(existingUser);
                return ResponseEntity.ok("Email OTP Verified Successfully .....!");
            }else
                return new ResponseEntity<>("Invalid OTP. Please try again .....!", HttpStatusCode.valueOf(410));
        }else
            return new ResponseEntity<>("User Not Found ....!",HttpStatusCode.valueOf(409));
    }

}

