package com.camunda.poc.starter.plugin.cockpit;

import org.camunda.bpm.cockpit.plugin.spi.impl.AbstractCockpitPlugin;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SamplePlugin  extends AbstractCockpitPlugin {

    public static final String ID = "sample-plugin";

    public String getId() {
        return ID;
    }

    @Override
    public List<String> getMappingFiles() {
        return Arrays.asList("org/camunda/bpm/cockpit/plugin/sample/queries/sample.xml");
    }

    @Override
    public Set<Class<?>> getResourceClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();

        classes.add(SamplePluginRootResource.class);

        return classes;
    }

}