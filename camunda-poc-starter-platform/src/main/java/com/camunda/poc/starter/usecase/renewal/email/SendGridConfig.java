package com.camunda.poc.starter.usecase.renewal.email;

import com.sendgrid.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

@Profile("renewal")
@Configuration
@PropertySource("classpath:application.properties")
public class SendGridConfig {

    @Value("${sendgrid.api.key}")
    String sendGridAPIKey;

    @Bean
    public SendGrid getGrid() {
        return new SendGrid(sendGridAPIKey);
    }

}