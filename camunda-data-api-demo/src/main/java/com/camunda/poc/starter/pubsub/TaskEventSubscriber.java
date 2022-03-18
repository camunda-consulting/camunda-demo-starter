package com.camunda.poc.starter.pubsub;

import com.camunda.poc.starter.data.kase.entity.Case;
import com.camunda.poc.starter.data.kase.repo.KaseRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.context.annotation.Profile;

import java.util.Map;
import java.util.logging.Logger;

@Profile("pubsub")
@EnableBinding(EventChannels.class)
public class TaskEventSubscriber {

	private final Logger LOGGER = Logger.getLogger(TaskEventSubscriber.class.getName());

	private KaseRepository repository;

	public TaskEventSubscriber(){}

	@Autowired
	public TaskEventSubscriber(KaseRepository repository){
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

				Case kase = new Case();
				repository.save(kase);
			}

		} else {
			LOGGER.info("\n\n Event Params NULL \n");
		}

	}//end handle function

}
