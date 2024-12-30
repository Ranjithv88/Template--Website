package com.springBoot.Template.Controller;

import com.springBoot.Template.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping("user/getUserDetails")
    public ResponseEntity<Map<String, Object>> getUser () {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        return service.getUserService(userName);
    }

}

