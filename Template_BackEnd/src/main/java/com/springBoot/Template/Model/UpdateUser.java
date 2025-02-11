package com.springBoot.Template.Model;

import com.springBoot.Template.Annotations.Decimal;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// Update User Details Model
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateUser {

    @NotBlank(message = " UserName is Mandatory ......! ")
    @Size(min = 2,message = " UserName Must Be Between 2 & 30 Characters .......! ",max = 40)
    private String userName;

    // this is Age Column
    @Decimal
    private int age;

    @NotBlank(message = " Email is Mandatory ......! ")
    @Email(message = " Email is Invalid .......! ")
    private String email;

    @NotNull(message = " Phone Number is Mandatory ......! ")
    @Size(min = 10,max = 10,message = " Phone Number is Invalid ......! ")
    private String phoneNumber;

}

