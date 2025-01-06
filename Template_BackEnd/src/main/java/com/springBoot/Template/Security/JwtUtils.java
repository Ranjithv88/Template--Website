package com.springBoot.Template.Security;

import com.springBoot.Template.Model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class JwtUtils {

    @Value("${spring.jwt.token.key}")
    private String secretKey;

    @Value("${spring.encrypt.key}")
    private String encryptKey;

    private SecretKeySpec secretKeySpec;

    private static final String ALGORITHM = "AES";
    private static final String CHARSET = "UTF-8";

    public Boolean block (String token) {
        try {
            init();
            token = decrypt(token);
            Date time = Jwts.parser().setAllowedClockSkewSeconds(60).setSigningKey(key()).build().parseClaimsJws(token).getBody().getExpiration();
            return time.before(new Date());
        } catch (ExpiredJwtException e) {
            log.info("Token is expired: {}", e.getMessage());
            return true;
        } catch (Exception e) {
            log.error("Error parsing JWT: {}", e.getMessage(), e);
            return false;
        }
    }

    public void init() {
        this.secretKeySpec = new SecretKeySpec(encryptKey.getBytes(), ALGORITHM);
    }

    public String encrypt(String data) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
        byte[] encrypted = cipher.doFinal(data.getBytes(CHARSET));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public String decrypt(String encryptedData) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
        byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
        return new String(decrypted, CHARSET);
    }

    public String generateToken (Map<String,Object> claims, User user) {
        claims.put("userName",user.getUsername());
        claims.put("role",user.getAuthorities());
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60 * 24))
                .signWith(key(), SignatureAlgorithm.HS384)
                .compact();
        String encryptToken = null;
        try{
            init();
            encryptToken = encrypt(token);
        }catch (Exception e){
            log.info(e.toString());
        }
        return encryptToken;
    }

    public Key key () {
        byte[] KeyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(KeyBytes);
    }

    public Claims extractClaims (String decryptToken) {
        String token = null;
        try{
            init();
            token = decrypt(decryptToken);
        }catch (Exception e){
            log.info(e.toString());
        }
        return Jwts.parser().setSigningKey(key()).build().parseClaimsJws(token).getBody();
    }

    public String extractEmail (String token) {
        return extractClaims(token).get("userName").toString();
    }

    public Collection<? extends GrantedAuthority> extractRole (String Token){
        Object roleClaims = extractClaims(Token).get("role");
        if(roleClaims instanceof List<?>){
            List<HashMap<String,String>> roles = (List<HashMap<String,String>>) roleClaims;
            System.out.println(" Token Role is = "+roles);
            return roles.stream().map(x-> new SimpleGrantedAuthority(x.get("authority"))).collect(Collectors.toSet());
        }else {
            return List.of( new SimpleGrantedAuthority(null));
        }
    }

    public Date extractExpiration (String token) {
        return extractClaims(token).getExpiration();
    }

    public Boolean validateExpiration (String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean tokenValidation (String token, UserDetails userDetails) {
        final String username = extractEmail(token);
        return (username.equals(userDetails.getUsername())) && !validateExpiration(token);
    }

}

