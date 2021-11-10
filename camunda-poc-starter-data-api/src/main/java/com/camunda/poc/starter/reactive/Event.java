package com.camunda.poc.starter.reactive;

import org.springframework.context.annotation.Profile;

@Profile("reactive")
public class Event {

    private String eventId;
    private String eventDt;

    Event(){}

    Event(String eventDt, String eventId){
        this.eventDt = eventDt;
        this.eventId = eventId;
    }

    public String getEventDt() {
        return eventDt;
    }

    public void setEventDt(String eventDt) {
        this.eventDt = eventDt;
    }


    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

}