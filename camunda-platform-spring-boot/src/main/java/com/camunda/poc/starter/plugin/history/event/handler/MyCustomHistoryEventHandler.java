package com.camunda.poc.starter.plugin.history.event.handler;

import org.camunda.bpm.engine.impl.cfg.TransactionState;
import org.camunda.bpm.engine.impl.context.Context;
import org.camunda.bpm.engine.impl.history.event.HistoryEvent;
import org.camunda.bpm.engine.impl.history.handler.DbHistoryEventHandler;
import org.camunda.bpm.engine.impl.history.handler.HistoryEventHandler;
import org.springframework.context.annotation.Profile;

import java.util.List;
import java.util.logging.Logger;

@Profile("history")
public class MyCustomHistoryEventHandler implements HistoryEventHandler {

    private final Logger LOGGER = Logger.getLogger(MyCustomHistoryEventHandler.class.getName());

    private static final MyCustomHistoryEventHandler INSTANCE = new MyCustomHistoryEventHandler();

    public static MyCustomHistoryEventHandler getInstance(){
        return INSTANCE;
    }

    // Hook to get the history event
    @Override
    public void handleEvent(HistoryEvent historyEvent) {

        LOGGER.info(" ***** HISTORY-EVENT REGISTERED: "+ historyEvent.getEventType()+ "\n");

        // gets the transaction context and adds the custom listener to the transaction
        // on a specific transaction state e.g. committed
        Context.getCommandContext()
                .getTransactionContext()
                .addTransactionListener(TransactionState.COMMITTED,
                        new MyHistoryEventCommitListener("Do It!", historyEvent));

    }

    @Override
    public void handleEvents(List<HistoryEvent> historyEvents) {
        for (HistoryEvent historyEvent : historyEvents) {
            handleEvent(historyEvent);
        }
    }

}
