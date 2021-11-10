package com.camunda.poc.starter.plugin.history.customlevel;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.engine.impl.history.HistoryLevel;
import org.camunda.bpm.engine.impl.history.handler.CompositeDbHistoryEventHandler;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Component
@Profile("history")
public class MyCustomHistoryLevelEnginePlugin implements ProcessEnginePlugin {

    private final Logger LOGGER = Logger.getLogger(Class.class.getName());

    @Override
    public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {

        LOGGER.info(" \n\n ******* In "+this.getClass().getSimpleName()+" \n\n");

        List<HistoryLevel> customHistoryLevels = processEngineConfiguration.getCustomHistoryLevels();

        LOGGER.info(" \n\n ******* Get Custom History Levels  "+customHistoryLevels.size()+" \n\n");

        // if the custom history levels are null then set an empty arraylist
        // finally add our custom history level
        if (customHistoryLevels == null) {
            customHistoryLevels = new ArrayList<>();
            processEngineConfiguration.setCustomHistoryLevels(customHistoryLevels);
        }
        customHistoryLevels.add(CustomHistoryLevel.getInstance());
    }

    @Override
    public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {

    }

    @Override
    public void postProcessEngineBuild(ProcessEngine processEngine) {

    }

}
