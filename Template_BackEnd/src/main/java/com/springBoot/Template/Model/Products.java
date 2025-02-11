package com.springBoot.Template.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.*;

// products Model for Table
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // this is Image Column
    @NotNull(message = " Image is Mandatory ......! ")
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @Column(unique=true)
    @NotBlank(message = " Name is Mandatory ......! ")
    @Size(min = 2,message = " Name Must Be Between 2 & 30 Characters .......! ", max = 40)
    private String name;

    @NotNull(message = " Price is Mandatory ......! ")
    @Positive(message = " Price Must Be Greater Than Zero ......! ")
    private int price;

    private Date updateOn;

    // ManyToMany For cart to Products
    @ManyToMany(mappedBy = "products",  cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Cart> carts = new LinkedList<>();

}

