package com.springBoot.Template.Repository;

import com.springBoot.Template.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

// Cart Repository
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // optional method used to Find By UserName
    Optional<Cart> findByUserName(String userName);
}

