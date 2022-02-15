package com.camunda.poc.starter.pubsub;

import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.context.annotation.Profile;

@Profile("pubsub")
@EnableBinding(EventChannels.class)
public class EventPublisher {
}
