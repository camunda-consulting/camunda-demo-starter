package com.camunda.poc.starter.plugin.cockpit;

import java.util.List;
import javax.ws.rs.GET;

import org.camunda.bpm.cockpit.db.QueryParameters;
import org.camunda.bpm.cockpit.plugin.resource.AbstractCockpitPluginResource;

public class SampleProcessInstanceResource extends AbstractCockpitPluginResource {

    public SampleProcessInstanceResource(String engineName) {
        super(engineName);
    }

    @GET
    public List<ProcessInstanceCountDto> getProcessInstanceCounts() {

        return getQueryService()
                .executeQuery(
                        "cockpit.sample.selectProcessInstanceCountsByProcessDefinition",
                        new QueryParameters<ProcessInstanceCountDto>());
    }
}