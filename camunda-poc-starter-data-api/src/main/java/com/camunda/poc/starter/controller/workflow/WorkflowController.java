package com.camunda.poc.starter.controller.workflow;

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
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Logger;

@Controller
public class WorkflowController {

	@Value("${camunda.host}")
	String camundaHost;

	@Value("${camunda.port}")
	String camundaPort;

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	public WorkflowController() {}

//	@Autowired
//	public WorkflowController() {
//
//	}

	/**
	 * Start a workflow sync with REST
	 * @param data
	 * @param variables
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/start", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> start(@RequestBody(required = true)String data,
											@RequestBody(required = false)Map variables) throws IOException {

		LOGGER.info("\n\n Start Workflow: "+ data);

		JSONObject jsData = new JSONObject(data);

		Response response = Request.Post("http://"+camundaHost+":"+camundaPort+"/engine-rest/message")
				.bodyString("{" +
						"  \"messageName\" : \"" + jsData.get("workflowKey") + "\"," +
						"  \"businessKey\" : \"" + jsData.get("businessKey") + "\"" +
						"}", ContentType.APPLICATION_JSON).execute();

		return (ResponseEntity<HttpStatus>) response.returnResponse().getEntity();
	}

	/**
	 * Start a workflow sync with REST
	 * @param data
	 * @param variables
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/correlate/message", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> correlate(@RequestBody(required = true)String data,
											@RequestBody(required = false)Map variables) throws IOException {

		LOGGER.info("\n\n Start Workflow: "+ data);

		JSONObject jsData = new JSONObject(data);

		Response response = Request.Post("http://"+camundaHost+":"+camundaPort+"/engine-rest/message")
				.bodyString("{" +
						"  \"messageName\" : \"" + jsData.get("workflowKey") + "\"," +
						"  \"businessKey\" : \"" + jsData.get("businessKey") + "\"" +
						"}", ContentType.APPLICATION_JSON).execute();

		return (ResponseEntity<HttpStatus>) response.returnResponse().getEntity();
	}



}