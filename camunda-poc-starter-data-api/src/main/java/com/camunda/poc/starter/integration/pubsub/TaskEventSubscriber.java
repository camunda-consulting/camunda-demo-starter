package com.camunda.poc.starter.integration.pubsub;

import com.camunda.poc.starter.entity.workflow.Status;
import com.camunda.poc.starter.repo.StatusRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.context.annotation.Profile;

import java.util.Map;
import java.util.logging.Logger;

@Profile("damage")
@EnableBinding(EventChannels.class)
public class TaskEventSubscriber {

	private final Logger LOGGER = Logger.getLogger(TaskEventSubscriber.class.getName());

	private StatusRepository repository;

	public TaskEventSubscriber(){}

	@Autowired
	public TaskEventSubscriber(StatusRepository repository){
		this.repository = repository;
	}

	@StreamListener("subscribeTaskEvent")
	public void handle(Event event) throws Exception {

		LOGGER.info("\n\n Received Event: " + event.getEventName());

		if (event.getEventName().equalsIgnoreCase(Event.START_WORKFLOW_EVENT)) {

			Map<String, Object> params = event.getEventParams();

			JSONObject jsData = new JSONObject(params.get("processVariables").toString());
			
			if (params != null) {
				LOGGER.info("\n\n Event Params: " + jsData.toString() + "\n");

				Status status = new Status();
				String key = jsData.getString("businessKey");
				status.setKey(key);
				String taskName = jsData.getString("taskName");
				status.setTaskName(taskName);
				String r_status = jsData.getString("status");
				status.setTaskName(r_status);

				repository.save(status);
			}

		} else {
			LOGGER.info("\n\n Event Params NULL \n");
		}

	}//end handle function

}
