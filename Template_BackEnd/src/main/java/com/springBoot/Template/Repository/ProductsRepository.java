package com.springBoot.Template.Repository;

import com.springBoot.Template.Model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {
    Optional<Products> findByName(String name);
    List<Products> findByNameContainingIgnoreCase(String name);
}

