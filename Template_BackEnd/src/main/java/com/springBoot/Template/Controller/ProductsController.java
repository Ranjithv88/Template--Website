package com.springBoot.Template.Controller;

import com.springBoot.Template.Model.Products;
import com.springBoot.Template.Service.ProductsServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Product Controller For Product api
@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductsController {

    // Services Class Dependency
    public final ProductsServices services;

    // get Api for Get All Products
    @GetMapping("/getProducts")
    public ResponseEntity<List<Products>> getApiForProducts () {
        return services.getCachedProducts();
    }

    // Post Api For Get One Product
    @PostMapping("/getOneProduct")
    public ResponseEntity<Products> getOneProducts (@RequestBody String name) {
        return services.getOneProducts(name);
    }

    // Post Api for Search products
    @PostMapping("/search/{searchName}")
    public ResponseEntity<List<String>> postSearchProducts (@PathVariable String searchName) {
        return services.SearchProducts(searchName);
    }

}

