package com.camunda.poc.starter.integration.pubsub;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.variable.Variables;
import org.camunda.bpm.engine.variable.value.TypedValue;
import org.camunda.spin.plugin.variable.SpinValues;
import org.camunda.spin.plugin.variable.value.JsonValue;
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

			JSONObject submission = new JSONObject(params.get("submission").toString());

			if (params != null) {
				LOGGER.info("\n\n Event Params: " + submission.toString() + "\n");

				//Use Camunda Value Type API to create a Json Object
				JsonValue jsonValue = SpinValues.jsonValue(params.get("submission").toString()).create();
				JsonValue jsonUserValue = SpinValues.jsonValue(params.get("user").toString()).create();

				//Use Camunda Message API to start the workflow
				runtimeService.correlateMessage(
						params.get("workflowKey").toString(),
						submission.get("businessKey").toString(),
						//Pass the JSON Object to Camunda starting the workflow
						Variables.createVariables()
								.putValueTyped("submission", jsonValue)
								.putValueTyped("user", jsonUserValue)
				);

			}else {
				LOGGER.info("\n\n Event Params NULL \n");
		 	}

		}

	}

}
