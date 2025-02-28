package com.springBoot.Template.Security;

import com.springBoot.Template.Repository.LogoutRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

// OncePerRequestFilter For AuthenticationFilter In Spring Boot
@Configuration
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

    // Import Other Class Properties
    private final UserDetailsService userDetailsService;
    private final JwtUtils jwtUtils;
    private final LogoutRepository repository;

    // this method Process the filter and process the Authorization
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authentication = request.getHeader("Authorization");
        final String jwt;
        final String email;
        if(authentication==null|| !authentication.startsWith("Bearer ")|| repository.existsByToken(authentication)){
            filterChain.doFilter(request,response);
            return ;
        }
        jwt = authentication.substring(7);
        email = jwtUtils.extractEmail(jwt);
        if(email!=null&& SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            if(jwtUtils.tokenValidation(jwt,userDetails)){
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails,null,jwtUtils.extractRole(jwt));
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(token);
                logger.info("UserName : "+jwtUtils.extractEmail(jwt)+" Permission Graded ....!");
            }
        }
        filterChain.doFilter(request,response);
    }
}

