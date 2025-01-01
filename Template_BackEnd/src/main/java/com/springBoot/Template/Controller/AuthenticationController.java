package com.springBoot.Template.Controller;

import com.springBoot.Template.Model.Login;
import com.springBoot.Template.Model.Register;
import com.springBoot.Template.Service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:8088",methods = {RequestMethod.POST})
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<String> register (@Valid @RequestBody Register data) {
        return service.register(data);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login ( @Valid @RequestBody Login data) {
        return service.login(data);
    }

    @PostMapping("user/logout")
    public ResponseEntity<String> logOut ( @RequestHeader("Authorization") String token @Valid @RequestBody("userName") String userName ) {

    }

}

