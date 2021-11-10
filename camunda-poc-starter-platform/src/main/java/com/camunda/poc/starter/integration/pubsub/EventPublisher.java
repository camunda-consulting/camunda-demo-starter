package com.camunda.poc.starter.integration.pubsub;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.context.annotation.Profile;

@Profile("pubsub")
@EnableBinding(EventChannels.class)
public class EventPublisher {
}
