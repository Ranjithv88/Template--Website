package com.springBoot.Template.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// test Controller
@RestController
public class TestingController {

    // Get Api for Testing purpose
    @GetMapping("/test")
    public String test0(){
        return " Testing Api .......!  ";
    }

    // Get Api for user Authentication
    @GetMapping("/user")
    public String test01(){
        return " test .......! ";
    }

}

