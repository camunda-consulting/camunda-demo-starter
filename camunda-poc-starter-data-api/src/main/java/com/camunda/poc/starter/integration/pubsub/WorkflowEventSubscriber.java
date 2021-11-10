package com.camunda.poc.starter.integration.pubsub;

import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.json.JSONObject;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.context.annotation.Profile;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Logger;

@Profile("damage")
@EnableBinding(EventChannels.class)
public class WorkflowEventSubscriber {

	private final Logger LOGGER = Logger.getLogger(WorkflowEventSubscriber.class.getName());

	public WorkflowEventSubscriber(){}

	private String accessToken;

	@StreamListener("subscribeWorkflowEvent")
	public void handle(Event event) throws Exception {

		LOGGER.info("\n\n Received Event: " + event.getEventName());

		if (event.getEventName().equalsIgnoreCase(Event.START_WORKFLOW_EVENT)) {

			Map<String, Object> params = event.getEventParams();

			JSONObject jsData = new JSONObject(params.get("processVariables").toString());

			if (params != null) {
				LOGGER.info("\n\n Event Params: " + jsData.toString() + "\n");
				if (accessToken == null) {
					String grant = requestSfOathGrant();
					LOGGER.info(" ====>> Salesforce Grant \n" + grant);
					//Parse JSON and get the workflow variables
					accessToken = new JSONObject(grant).getString("access_token");
				}
				String key = jsData.getString("businessKey");
				String body = createSfObject(accessToken, key);
			}

		} else {
			LOGGER.info("\n\n Event Params NULL \n");
		}

	}//end handle function

	private String requestSfOathGrant() throws IOException {
		return Request.Post("https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9p1Q1BCe9GmA2i4VM2yUSqOZwtXNI7EjJpLAE6YVLn5UCrtU5XOk0FPz6CzDAUMZuuLLwjaV.hYtyGTHp&client_secret=C54081258696E282D2646A3AB276E793ADA3B73915C82B0B352FDCA0C8123049" +
				"&username=paullungu@camunda.com&password=Budwe1ser0MJWiTaYkeotUS9jiP1pHY39")
				.execute().returnContent().asString();
	}

	private String createSfObject(String accessToken, String key) throws IOException {
		return Request.Post("https://camunda2-dev-ed.my.salesforce.com/services/data/v52.0/sobjects/case")
				.addHeader("Authorization", "Bearer "+accessToken)
				.bodyString("{\n" +
						"  \"SuppliedName\" : \""+key+"\"," +
						"  \"Subject\" : \"Testing the integreation with Camunda\"" +
						"}", ContentType.APPLICATION_JSON)
				.execute().returnContent().asString();
	}

}
