package com.springBoot.Template.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class TestingController {

    @GetMapping("/test")
    public String test0(){
        return " Testing Api .......!  ";
    }

    @GetMapping("/user")
    public String test01(){
        return "test...";
    }

}

