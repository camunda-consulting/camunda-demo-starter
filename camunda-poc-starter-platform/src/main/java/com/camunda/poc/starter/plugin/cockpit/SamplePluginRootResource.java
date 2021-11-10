package com.camunda.poc.starter.plugin.cockpit;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import org.camunda.bpm.cockpit.plugin.resource.AbstractCockpitPluginRootResource;

@Path("plugin/" + SamplePlugin.ID)
public class SamplePluginRootResource extends AbstractCockpitPluginRootResource {

    public SamplePluginRootResource() {
        super(SamplePlugin.ID);
    }

    @Path("{engineName}/process-instance")
    public SampleProcessInstanceResource getProcessInstanceResource(@PathParam("engineName") String engineName) {
        return subResource(new SampleProcessInstanceResource(engineName), engineName);
    }
}