package com.springBoot.Template.Service;

import com.springBoot.Template.Model.UpdateUser;
import com.springBoot.Template.Model.User;
import com.springBoot.Template.Repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final JavaMailSender javaMailSender;

    public ResponseEntity<Map<String, Object>> getUserService (String userName) {
        User userDetails = repository.findByUserDetails(userName);
        Map<String, Object> response = Map.of("userName", userDetails.getUsername(),"age", userDetails.getAge(),"email", userDetails.getEmail(),"phoneNumber", userDetails.getPhoneNumber(), "emailStatus", userDetails.isEmailStatus(), "phoneNumberStatus", userDetails.isPhoneNumberStatus());
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

    public ResponseEntity<String> otpService (String data) {
        SimpleMailMessage message = new SimpleMailMessage();
        User userDetails = repository.findByUserDetails(data);
        if(repository.existsByUserName(data)) {
            message.setFrom("ranjithkumar22445588@gmail.com");
            message.setTo(data);
            message.setSubject("PortFolio Team for Mail Verification");
            message.setText("Dear User,\n\n" +
                    data + "\n\n" +
                    "We have received a request to access your account. To complete this email Verification  process, please use the following One-Time Password (OTP):\n\n" +
                    "OTP: " + "909090" + "\n\n" +
                    "Please note:\n" +
                    "- This OTP is valid for 60 seconds.\n" +
                    "- Do not share this OTP with anyone.\n" +
                    "- If you did not request this, please ignore this email or contact support immediately.\n\n" +
                    "Thank you,\n" +
                    "Your Service Team");
            javaMailSender.send(message);
            return ResponseEntity.ok(" Mail Sending SuccessFully....! ");
        }else if(userDetails.isEmailStatus()) {
            return new ResponseEntity<>("User is Already Verified.....!",HttpStatusCode.valueOf(409));
        }else
            return new ResponseEntity<>("User Not Found ....!",HttpStatusCode.valueOf(409));
    }

}

