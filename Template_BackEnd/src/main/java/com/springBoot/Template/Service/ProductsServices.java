package com.springBoot.Template.Service;

import com.springBoot.Template.Model.Products;
import com.springBoot.Template.Repository.ProductsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductsServices {

    public final ProductsRepository repository;

    public ResponseEntity<List<Products>> getProducts() {
        List<Products> products = repository.findAll();
        return products.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(products, HttpStatus.OK);
    }

}

