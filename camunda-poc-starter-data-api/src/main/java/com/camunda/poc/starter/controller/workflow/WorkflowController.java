package com.camunda.poc.starter.controller.workflow;

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
import java.util.logging.Logger;

@Controller
public class WorkflowController {

	@Value("${camunda.host}")
	String camundaHost;

	@Value("${camunda.port}")
	String camundaPort;

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

		workflowData.put("messageName", jsData.get("workflowKey"));
		workflowData.put("businessKey", jsData.get("businessKey"));

		if (jsData.has("processVariables")) {
			workflowData.put("processVariables", new JSONObject(jsData.get("processVariables").toString()));
		}

		LOGGER.info("\n\n Start Workflow with data: "+ workflowData.toString() +"\n\n");

		response = Request.Post("http://"+camundaHost+":"+camundaPort+"/engine-rest/message")
			.bodyString(workflowData.toString(), ContentType.APPLICATION_JSON).execute();

		return (HttpResponse) response.returnResponse();
	}
}