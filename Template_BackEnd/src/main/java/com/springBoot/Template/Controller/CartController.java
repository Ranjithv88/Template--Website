package com.springBoot.Template.Controller;

import com.springBoot.Template.Model.Cart;
import com.springBoot.Template.Service.CartServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Cart Controller For cart api
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class CartController {

    // Services Class Dependency
    private final CartServices services;

    // Put Api For Update Cart
    @PutMapping("/updateCart/{userName}/{productId}")
    public ResponseEntity<Cart> putMappingForCart(@PathVariable String userName,  @PathVariable Long productId) {
        return services.updateCart(userName, productId);
    }

    // Delete Api For Remove Cart
    @DeleteMapping("deleteCart/{userName}/{productId}")
    public ResponseEntity<Cart> deleteMappingForCart(@PathVariable String userName,  @PathVariable Long productId) {
        return services.deleteCart(userName, productId);
    }

}

