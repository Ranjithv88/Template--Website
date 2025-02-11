package com.springBoot.Template.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// OTP Details Model
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OTPDetails {

    private String otp;

    private long expiryTime;

}

