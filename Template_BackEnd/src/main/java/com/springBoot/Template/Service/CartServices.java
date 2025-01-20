package com.springBoot.Template.Service;

import com.springBoot.Template.Model.Cart;
import com.springBoot.Template.Model.Products;
import com.springBoot.Template.Repository.CartRepository;
import com.springBoot.Template.Repository.ProductsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServices {

    private final CartRepository cartRepository;
    public final ProductsRepository productsRepository;


    public ResponseEntity<Cart> updateCart(String userName, Long productId) {
        Optional<Cart> cartDetails = cartRepository.findByUserName(userName);
        if(cartDetails.isPresent()){
            List<Products> productList = null;
            Cart existingCart = cartDetails.get();
            Optional<Products> product = productsRepository.findById(productId);
            if(product.isPresent()) {
                productList = existingCart.getProducts();
                boolean productExisting = productList.stream().anyMatch(p -> p.getId() == productId);
                if(!productExisting) {
                    productList.add(product.get());
                    existingCart.setProducts(productList);
                    return ResponseEntity.ok(cartRepository.save(existingCart));
                }else
                    return ResponseEntity.status(410).build();
            }else
                return ResponseEntity.status(415).build();
        }else
            return ResponseEntity.status(409).build();
    }

    public ResponseEntity<Cart> deleteCart(String userName, Long productId) {
        Optional<Cart> cartDetails = cartRepository.findByUserName(userName);
        if(cartDetails.isPresent()) {
            List<Products> productList = null;
            Cart existingCart = cartDetails.get();
            productList = existingCart.getProducts();
            Optional<Products> productToRemove = productList.stream().filter(p -> p.getId()==productId).findFirst();
            if(productToRemove.isPresent()){
                productList.remove(productToRemove.get());
                existingCart.setProducts(productList);
                return ResponseEntity.ok(cartRepository.save(existingCart));
            }else
                return ResponseEntity.status(410).build();
        }else
            return ResponseEntity.status(409).build();
    }

}

