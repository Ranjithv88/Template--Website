package com.springBoot.Template.Model;

import com.springBoot.Template.Annotations.Decimal;
import com.springBoot.Template.Model.Enum.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = " UserName is Mandatory ......! ")
    @Size(min = 2,message = " UserName Must Be Between 2 & 30 Characters .......! ",max = 40)
    private String userName;

    @Decimal
    private int age;

    @NotBlank(message = " Email is Mandatory ......! ")
    @Email(message = " Email is Invalid .......! ")
    @Column(unique=true)
    private String email;

    @NotBlank(message = " Password is Mandatory ......! ")
    @Size(min = 8,message = " Too Weak .......! ")
    private String password;

    @NotNull(message = " Phone Number is Mandatory ......! ")
    @Size(min = 10,max = 10,message = " Phone Number is Invalid ......! ")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
