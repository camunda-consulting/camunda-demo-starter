package com.camunda.poc.starter.integration.pubsub;

import org.springframework.context.annotation.Profile;

@Profile("pubsub")
public class RequestMapper {
    private long id;

    public RequestMapper(){}

}
