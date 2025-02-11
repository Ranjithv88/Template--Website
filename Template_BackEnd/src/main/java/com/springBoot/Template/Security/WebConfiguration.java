package com.springBoot.Template.Security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Configuration for CROS Origin
@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    // Set Origins And Methods
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8088", "http://127.0.0.1:8088", "http://localhost:5500", "http://127.0.0.1:5500", "https://template-front-dt4241diy-ranjithv88s-projects.vercel.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }

}

