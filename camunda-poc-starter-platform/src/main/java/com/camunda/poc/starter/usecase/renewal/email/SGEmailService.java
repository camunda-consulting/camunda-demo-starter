package com.camunda.poc.starter.usecase.renewal.email;

import org.springframework.context.annotation.Profile;

@Profile("renewal")
public interface SGEmailService {

    void sendText(String from, String to, String subject, String body);

    void sendHTML(String from, String to, String subject, String body);

}