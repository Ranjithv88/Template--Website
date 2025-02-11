package com.springBoot.Template.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.LinkedList;
import java.util.List;

// Cart Model for Cart Table
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique=true)
    @NotBlank(message = " userName is Mandatory ......! ")
    @Size(min = 2,message = " Username Must Be Between 2 & 30 Characters .......! ", max = 40)
    private String userName;

    // OneToOne RelationShip For Cart to User
    @OneToOne(mappedBy = "cart")
    @JsonBackReference
    private User user;

    // ManyToMany RelationShip For Cart to products
    @ManyToMany
    @JoinTable(name = "cart_products", joinColumns = @JoinColumn(name = "cart_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    @JsonManagedReference
    private List<Products> products = new LinkedList<>();

}

