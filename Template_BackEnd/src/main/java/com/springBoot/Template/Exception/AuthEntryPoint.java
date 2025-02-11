package com.springBoot.Template.Exception;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import java.io.IOException;

// AuthenticationEntryPoint for Spring Security
@Slf4j
@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {

    // this method send the Unauthorized Message
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException ex) throws IOException, ServletException {
        log.error(" Unauthorized error: {} ",ex.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED," Error: Unauthorized ");
    }

}

