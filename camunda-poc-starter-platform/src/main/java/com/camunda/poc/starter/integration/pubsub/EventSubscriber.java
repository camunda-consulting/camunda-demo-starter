package com.camunda.poc.starter.integration.pubsub;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.variable.Variables;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.context.annotation.Profile;

import java.util.Map;
import java.util.logging.Logger;

@Profile("pubsub")
@EnableBinding(EventChannels.class)
public class EventSubscriber {

	private final Logger LOGGER = Logger.getLogger(EventSubscriber.class.getName());

	public EventSubscriber(){}

	private RuntimeService runtimeService;

	@Autowired
	public EventSubscriber(RuntimeService runtimeService){
		this.runtimeService = runtimeService;
	}

	@StreamListener("subscribeWorkflowEvent")
	public void handle(Event event) throws Exception {
		LOGGER.info("\n\n Received Event: " + event.getEventName());

		RequestMapper mapper = event.getKafkaRequestMapper();

		if (event.getEventName().equalsIgnoreCase(Event.START_WORKFLOW_EVENT)) {

			Map<String, Object> params = event.getEventParams();

			JSONObject jsData = new JSONObject(params.get("processVariables").toString());

			if (params != null) {
				LOGGER.info("\n\n Event Params: " + jsData.toString() + "\n");

				//Use Camunda Message API to start the workflow
				runtimeService.correlateMessage(jsData.get("workflowKey").toString(), jsData.get("businessKey").toString(),
					Variables.createVariables().putValue("approved", true)
							                   .putValue("responsible", true)
							                   .putValue("severity", "high")
							                   .putValue("location", jsData.get("location").toString())
							                   .putValue("damageType", jsData.get("damageType").toString())
				);

			}else {
			LOGGER.info("\n\n Event Params NULL \n");
		  }

		}

	}

}
