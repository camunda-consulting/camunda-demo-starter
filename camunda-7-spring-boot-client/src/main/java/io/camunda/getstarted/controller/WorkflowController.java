package io.camunda.getstarted.controller;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.apache.http.entity.ContentType;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;
import java.util.Iterator;
import java.util.logging.Logger;

@Controller
public class WorkflowController {

	@Value("${camunda.api}")
	String camundaApi;

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	public WorkflowController() {}

	/**
	 * Start a workflow sync with REST
	 * @param data
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/message/start", method = RequestMethod.POST, consumes = {"application/json"})
	public HttpResponse start(@RequestBody(required = true)String data)
			throws IOException, InterruptedException {

		LOGGER.info("\n\n Start Workflow with data: "+ data +"\n\n");

		JSONObject jsData = new JSONObject(data);
		Response response = null;
		JSONObject workflowData = new JSONObject();

		workflowData.put("messageName", jsData.get("key"));

		JSONObject processVariables = new JSONObject();
		if (jsData.has("variables")) {
			JSONObject variables = jsData.getJSONObject("variables");
			Iterator<String> itr = variables.keys();
			workflowData.put("businessKey", variables.getString("caseId"));
			while (itr.hasNext())
			{
				String key = itr.next();
				JSONObject value = new JSONObject().put("value", variables.getString(key));
				processVariables.put(key, value);
				LOGGER.info("\n ProcessVariables: "+ processVariables.toString() );
			}
			workflowData.put("processVariables", processVariables);

		}

		LOGGER.info("\n\n Workflow API "+camundaApi+" \n Start Workflow with data: "+ workflowData.toString() +"\n\n");

		response = Request.Post(camundaApi)
			.bodyString(workflowData.toString(), ContentType.APPLICATION_JSON).execute();

		//TODO - figure out why this always returns 404 not found?
		return (HttpResponse) response.returnResponse();
	}
}