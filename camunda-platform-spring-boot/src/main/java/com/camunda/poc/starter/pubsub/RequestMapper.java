package com.camunda.poc.starter.pubsub;

import org.springframework.context.annotation.Profile;

@Profile("pubsub")
public class RequestMapper {
    private long id;

    public RequestMapper(){}

}
