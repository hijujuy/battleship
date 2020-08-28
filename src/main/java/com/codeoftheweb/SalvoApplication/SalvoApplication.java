package com.codeoftheweb.SalvoApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SalvoApplication {
        
    public static void main(String[] args) {
            SpringApplication.run(SalvoApplication.class, args);
    }
    
    @Bean
    public CommandLineRunner startWeb() {
        return (String[] args) -> {
            System.out.println("Inicio desde Start Web");
        };
    }
    
}
