package com.camunda.poc.starter.controller.workflow;

import com.fasterxml.jackson.databind.json.JsonMapper;
import io.netty.handler.codec.json.JsonObjectDecoder;
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
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/start", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> start(@RequestBody(required = true)String data)
			throws IOException, InterruptedException {

		LOGGER.info("\n\n Start Workflow with data: "+ data +"\n\n");

		JSONObject jsData = new JSONObject(data);

		Response response = null;



		for (int i=0;jsData.getJSONArray("workflowKey").length()>i; i++)
		{
			JSONObject workflowData = new JSONObject();
			workflowData.put("messageName", jsData.getJSONArray("workflowKey").get(i).toString());
			workflowData.put("businessKey", jsData.get("businessKey"));
			workflowData.put("processVariables", new JSONObject(jsData.get("processVariables").toString()) );

			LOGGER.info("\n\n Start Workflow with data: "+ workflowData.toString() +"\n\n");

			response = Request.Post("http://"+camundaHost+":"+camundaPort+"/engine-rest/message")
				.bodyString(workflowData.toString(), ContentType.APPLICATION_JSON).execute();

			Thread.sleep(100);
		}

		return (ResponseEntity<HttpStatus>) response.returnResponse().getEntity();
	}

	/**
	 * Start a workflow sync with REST
	 * @param data
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/correlate/message", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> correlate(@RequestBody(required = true)String data)
			throws IOException, InterruptedException {

		LOGGER.info("\n\n Start Workflow: "+ data);

		JSONObject jsData = new JSONObject(data);

		Response response = null;

		for (int i=0;jsData.getJSONArray("workflowKey").length()>i; i++)
		{
			JSONObject workflowData = new JSONObject();
			workflowData.put("messageName", jsData.getJSONArray("workflowKey").get(i).toString());
			workflowData.put("businessKey", jsData.get("businessKey"));
			response = Request.Post("http://"+camundaHost+":"+camundaPort+"/engine-rest/message")
					.bodyString(workflowData.toString(), ContentType.APPLICATION_JSON).execute();

			Thread.sleep(100);
		}

		return (ResponseEntity<HttpStatus>) response.returnResponse().getEntity();
	}



}