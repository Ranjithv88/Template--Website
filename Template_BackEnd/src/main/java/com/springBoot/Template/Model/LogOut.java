package com.springBoot.Template.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

// LogOut Model
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

    private String userName;

    @Column(unique=true, length = 5000)
    private String token;

    private Date createdOn;

}

