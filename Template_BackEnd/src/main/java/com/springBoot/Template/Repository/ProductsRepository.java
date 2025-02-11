package com.springBoot.Template.Repository;

import com.springBoot.Template.Model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

// Products Repository
@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
    // optional method used to Find By UserName
    Optional<Products> findByName(String name);
    // List Of Products Return this method and Ignore Case
    List<Products> findByNameContainingIgnoreCase(String name);
}

