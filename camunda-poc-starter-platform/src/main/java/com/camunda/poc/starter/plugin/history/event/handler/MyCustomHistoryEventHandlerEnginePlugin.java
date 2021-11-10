package com.camunda.poc.starter.plugin.history.event.handler;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.camunda.bpm.engine.impl.history.handler.CompositeDbHistoryEventHandler;
import org.camunda.bpm.engine.impl.history.handler.CompositeHistoryEventHandler;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
@Profile("history")
public class MyCustomHistoryEventHandlerEnginePlugin implements ProcessEnginePlugin {

    private final Logger LOGGER = Logger.getLogger(Class.class.getName());

    @Override
    public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {

    }

    @Override
    public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {

        LOGGER.info(" \n\n ******* Setting Custom History Event Handler "+this.getClass().getSimpleName()+" \n\n");

        //allows us to set the appropriate event handler
        //CompositeHistoryEventHandler maintains the current history and allows to handle history event however needed
        processEngineConfiguration.setHistoryEventHandler(new CompositeHistoryEventHandler(MyCustomHistoryEventHandler.getInstance()));

//        processEngineConfiguration.setHistoryEventHandler(new CompositeDbHistoryEventHandler(MyCustomHistoryEventHandler.getInstance()));
//        processEngineConfiguration.setHistoryEventHandler(MyCustomHistoryEventHandler.getInstance());

    }

    @Override
    public void postProcessEngineBuild(ProcessEngine processEngine) {

    }

}
