package com.camunda.poc.starter.pubsub;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.variable.Variables;
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
public class StartWorkflowEventSubscriber {

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	public StartWorkflowEventSubscriber(){}

	private RuntimeService runtimeService;

	@Autowired
	public StartWorkflowEventSubscriber(RuntimeService runtimeService){
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
