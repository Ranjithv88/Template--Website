package com.springBoot.Template.Security;

import com.springBoot.Template.Model.OTPDetails;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Log
@Service
public class OTPServices {

    private static final long OTP_VALIDITY_DURATION = TimeUnit.MINUTES.toMillis(5);
    private final Map<String, OTPDetails> otpStorage = new ConcurrentHashMap<>();

    public String generateOTP(String userId) {
        otpStorage.remove(userId);
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        long expiryTime = System.currentTimeMillis() + OTP_VALIDITY_DURATION;
        otpStorage.put(userId, new OTPDetails(otp, expiryTime));
        return otp;
    }

    public boolean validateOTP(String userId, String otp) {
        OTPDetails details = otpStorage.get(userId);
        String otpData = otp.substring(8, 14);
        log.info(otpData);
        if (details == null) {
            return false;
        }
        if (System.currentTimeMillis() > details.getExpiryTime()) {
            otpStorage.remove(userId);
            return false;
        }
        return details.getOtp().equals(otpData);
    }

}

