package com.springBoot.Template.Service;

import com.springBoot.Template.Model.Products;
import com.springBoot.Template.Repository.ProductsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Log
@Service
@RequiredArgsConstructor
public class ProductsServices {

    public final ProductsRepository repository;

    public ResponseEntity<List<Products>> getProducts() {
        try {
            productsInsert();
        } catch (IOException e) {
            log.info(e.getMessage());
        }
        List<Products> products = repository.findAll();
        return products.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(products, HttpStatus.OK);
    }

    public ResponseEntity<Products> getOneProducts(String name) {
        Optional<Products> product = repository.findByName(name.substring(9, name.length()-2));
        return product.map(p -> new ResponseEntity<>(p, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public void productsInsert() throws IOException {
        List<Products> products = repository.findAll();
        if(products.isEmpty()){
            Path path = Paths.get("../ProductsImages/download.jpg");
            List<Products> productsList = new ArrayList<>();
            for (char ch = 'A'; ch <= 'Z'; ch++) {
                String productName = "Product " + ch;
                int price = generateRandomOddNumber();
                byte[] imageBytes = Files.readAllBytes(path);
                productsList.add(Products.builder()
                        .name(productName)
                        .image(imageBytes)
                        .price(price)
                        .updateOn(new Date(System.currentTimeMillis()))
                        .build());
            }
            repository.saveAll(productsList);
        }else{
            log.info(" Already Products Inserted ......! ");
        }
    }

    private int generateRandomOddNumber() {
        int price = ThreadLocalRandom.current().nextInt(1, 101);
        return price % 2 == 0 ? price + 1 : price;
    }

}

