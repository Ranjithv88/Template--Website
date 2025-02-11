package com.springBoot.Template.Service;

import com.springBoot.Template.Model.Products;
import com.springBoot.Template.Repository.ProductsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

// Products Service Class
@Log
@Service
@RequiredArgsConstructor
public class ProductsServices {

    // Repository Class Dependency
    public final ProductsRepository repository;

    // Get Products Services Method
    //@Cacheable(value = "Products")
    public List<Products> getProducts() {
        try {
            productsInsert();
        } catch (IOException e) {
            log.info(e.getMessage());
        }
        List<Products> products = repository.findAll();
        return products.isEmpty() ? Collections.emptyList() : products;
    }

    // Get Products Services Method And Save the Redis Server
    public ResponseEntity<List<Products>> getCachedProducts() {
        List<Products> cachedProducts = getProducts();
        if (cachedProducts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(cachedProducts, HttpStatus.OK);
        }
    }

    // Get One Products Services Method And Save the Redis Server
    // @Cacheable(value = "product", key = "#name")
    public ResponseEntity<Products> getOneProducts(String name) {
        Optional<Products> product = repository.findByName(name.substring(9, name.length()-2));
        return product.map(p -> new ResponseEntity<>(p, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Search Products Services Method
    public ResponseEntity<List<String>> SearchProducts(String searchName) {
        List<Products> products = repository.findByNameContainingIgnoreCase(searchName);
        return ResponseEntity.ok(products.stream().map(Products::getName).collect(Collectors.toList()));
    }

    // If Products Table is Empty that Method Insert Data For Table And Remove The Redis Server
    //@CacheEvict(value = "products", allEntries = true)
    public void productsInsert() throws IOException {
        List<Products> products = repository.findAll();
        if(products.isEmpty()){
            Path path = Paths.get("../ProductsImages/download.jpg");
            List<Products> productsList = new ArrayList<>();
            for (char ch = 'A'; ch <= 'Z'; ch++) {
                String productName = "Product-" + ch;
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

    // Generate Random Prices Number for Products Prices Method
    private int generateRandomOddNumber() {
        int price = ThreadLocalRandom.current().nextInt(1, 101);
        return price % 2 == 0 ? price + 1 : price;
    }

}

