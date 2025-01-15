package com.springBoot.Template.Controller;

import com.springBoot.Template.Model.Cart;
import com.springBoot.Template.Service.CartServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class CartController {

    private final CartServices services;

    @PutMapping("/updateCart/{userName}/{productId}")
    public ResponseEntity<Cart> putMappingForCart(@PathVariable String userName,  @PathVariable Long productId) {
        return services.updateCart(userName, productId);
    }

    @DeleteMapping("deleteCart/{userName}/{productId}")
    public ResponseEntity<Cart> deleteMappingForCart(@PathVariable String userName,  @PathVariable Long productId) {
        return services.deleteCart(userName, productId);
    }

}

