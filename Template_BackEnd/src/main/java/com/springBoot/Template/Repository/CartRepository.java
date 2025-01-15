package com.springBoot.Template.Repository;

import com.springBoot.Template.Model.Cart;
import com.springBoot.Template.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserName(String userName);
}

