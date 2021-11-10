package com.camunda.poc.starter.integration.pubsub;

import org.springframework.context.annotation.Profile;

import java.util.Date;
import java.util.Map;

@Profile("pubsub")
public class Event {

    public static String START_WORKFLOW_EVENT = "start-worflow-event";
    public static String UPDATE_WORKFLOW_EVENT = "update-worflow-event";
    public static String END_WORKFLOW_EVENT = "end-worflow-event";
    public static String START_TASK_EVENT = "start-task-event";
    public static String COMPLETE_TASK_EVENT = "complete-task-event";

    public static String START = "start-type";
    public static String UPDATE = "update-type";

    private RequestMapper mapper;
    private String eventName;
    private String eventType;
    private Map<String, Object> eventParams;
    private Date created;

    public Event(){}

    public Event(RequestMapper mapper){
        this.mapper = mapper;
    }

    public Event(Map eventParams){
        this.eventParams = eventParams;
    }

    public Event(RequestMapper mapper, Map eventParams){
        this.eventParams = eventParams;
        this.mapper = mapper;
    }

    public RequestMapper getKafkaRequestMapper() {
        return mapper;
    }

    public void setKafkaRequestMapper(RequestMapper mapper) {
        this.mapper = mapper;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Map getEventParams() {
        return eventParams;
    }

    public void setEventParams(Map eventParams) {
        this.eventParams = eventParams;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }
}
