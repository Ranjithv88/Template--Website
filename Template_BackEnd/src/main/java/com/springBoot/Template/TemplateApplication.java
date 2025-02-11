package com.springBoot.Template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

// Main Class
@EnableCaching
@SpringBootApplication
public class TemplateApplication {

	// Main Method for Template Project
	public static void main(String[] args) {
		SpringApplication.run(TemplateApplication.class, args);
	}

}

