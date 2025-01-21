package com.springBoot.Template.Controller;

import com.springBoot.Template.Model.Products;
import com.springBoot.Template.Repository.ProductsRepository;
import com.springBoot.Template.Service.ProductsServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.servlet.function.RequestPredicates.contentType;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductsController {

    public final ProductsServices services;
    private final ProductsRepository repository;

    @GetMapping("/getProducts")
    public ResponseEntity<List<Products>> getApiForProducts () {
        return services.getProducts();
    }

//    @PostMapping("/putProduct")
//    public ResponseEntity<String> putProduct(@RequestParam("image") MultipartFile file) {
//        try {
//            Optional<Products> products = repository.findById(1L);
//            products.get().setImage(file.getBytes());
//            repository.save(products.get());
//            return ResponseEntity.ok().body("success");
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }

    @PostMapping("/getOneProduct")
    public ResponseEntity<Products> getOneProducts (@RequestBody String name) {
        return services.getOneProducts(name);
    }

}

