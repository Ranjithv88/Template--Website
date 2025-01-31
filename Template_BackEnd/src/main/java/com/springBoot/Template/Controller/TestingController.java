package com.springBoot.Template.Controller;

import com.springBoot.Template.Model.Products;
import com.springBoot.Template.Repository.ProductsRepository;
import com.springBoot.Template.Service.ProductsServices;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class TestingController {

    public final ProductsServices repository;

    @Cacheable(value = "Products01")
    @GetMapping("/test")
    public String test0(){
        return " Testing Api .......!  ";
    }

    @GetMapping("/user")
    public String test01(){
        return "test...";
    }

    @GetMapping("/test01")
    public Optional<Products> test02(){
        return repository.getOneProducts01();
    }

}

