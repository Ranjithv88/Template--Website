package com.springBoot.Template.Controller;

import com.springBoot.Template.Model.UpdateUser;
import  com.springBoot.Template.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

// user Controller
@RestController
@RequiredArgsConstructor
public class UserController {

    // Services Class Dependency
    private final UserService service;

    // Get Api for get User Details
    @GetMapping("user/getUserDetails")
    public ResponseEntity<Map<String, Object>> getUser () {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        return service.getUserService(userName);
    }

    // Put Api for get User Details Update
    @PutMapping("user/UpdateUser")
    public ResponseEntity<String> putUser (@Valid @RequestBody UpdateUser data) {
        return service.updateUserDetails(data);
    }

    // Get Api for Send OTP
    @GetMapping("/user/sendOTP")
    public ResponseEntity<String> otpGetApi (@RequestParam("userName") String data) {
        return service.otpService(data);
    }

    // post Api for get OTP
    @PostMapping("/user/sendOTP")
    public ResponseEntity<String> otpTestApi (@RequestParam("userName") String data, @RequestBody String otp) {
        return service.otpTestService(data, otp);
    }

}

