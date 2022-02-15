package com.camunda.poc.starter.plugin.history.customlevel;

import org.camunda.bpm.engine.impl.history.AbstractHistoryLevel;
import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.camunda.bpm.engine.impl.history.event.HistoryEventType;
import org.camunda.bpm.engine.impl.history.event.HistoryEventTypes;
import org.springframework.context.annotation.Profile;

import java.util.ArrayList;
import java.util.List;

@Profile("history")
public class CustomHistoryLevel extends AbstractHistoryLevel implements HistoryLevel {

    public static final CustomHistoryLevel INSTANCE = new CustomHistoryLevel();

    private static List<HistoryEventType> eventTypes = new ArrayList<>();

    static{
        eventTypes.add(HistoryEventTypes.PROCESS_INSTANCE_START);
        eventTypes.add(HistoryEventTypes.PROCESS_INSTANCE_END);
        eventTypes.add(HistoryEventTypes.ACTIVITY_INSTANCE_END);
    }

    public static HistoryLevel getInstance() {
        return INSTANCE;
    }

    @Override
    public int getId() {
        return 222;
    }

    @Override
    public String getName() {
        return "custom-history-level";
    }

    @Override
    public boolean isHistoryEventProduced(HistoryEventType eventType, Object entity) {

        return eventTypes.contains(eventType);

    }
}
