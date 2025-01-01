package com.springBoot.Template.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "logout")
public class LogOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = " UserName is Mandatory ......! ")
    @Size(min = 2,message = " UserName Must Be Between 2 & 30 Characters .......! ",max = 40)
    private String userName;

    @Column(unique=true)
    @NotBlank(message = " Token is Need ...! ")
    private String token;

}

