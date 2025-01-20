package com.springBoot.Template.Service;

import com.springBoot.Template.Model.Products;
import com.springBoot.Template.Repository.ProductsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductsServices {

    public final ProductsRepository repository;

    public ResponseEntity<List<Products>> getProducts() {
        List<Products> products = repository.findAll();
        return products.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(products, HttpStatus.OK);
    }

    public ResponseEntity<Products> getOneProducts(String name) {
        Optional<Products> product = repository.findByName(name.substring(9, name.length()-2));
        return product.isPresent() ? new ResponseEntity<>(product.get(), HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

