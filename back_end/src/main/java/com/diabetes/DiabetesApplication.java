package com.diabetes;

import com.diabetes.auth.config.AuthProperties;
import com.diabetes.common.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;


@EnableConfigurationProperties({AuthProperties.class, CorsProperties.class})
@SpringBootApplication
public class DiabetesApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiabetesApplication.class, args);
    }

}
