package com.camunda.poc.starter.integration.pubsub;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.context.annotation.Profile;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;

@Profile("pubsub")
public interface EventChannels {

    @Output("publishWorkflowEvent")
    MessageChannel publish();

    @Input("subscribeWorkflowEvent")
    SubscribableChannel start();


    @Output("publishTaskEvent")
    MessageChannel publishTask();

    @Input("subscribeTaskEvent")
    SubscribableChannel startTaskSubscriber();

}


