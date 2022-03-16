package io.camunda.getstarted.controller;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.Map;

import io.camunda.zeebe.spring.client.EnableZeebeClient;
import io.camunda.zeebe.spring.client.ZeebeClientLifecycle;
import io.camunda.zeebe.client.api.response.ProcessInstanceEvent;

import java.io.IOException;
import java.util.logging.Logger;

@EnableZeebeClient
@Controller
public class CloudWorkflowController {

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	private ZeebeClientLifecycle client;

	@Autowired
	public CloudWorkflowController( ZeebeClientLifecycle client ) {
		this.client = client;
	}

	/**
	 * Start a workflow sync with REST
	 * @param data
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/cloud/start", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<?> start(@RequestBody(required = true)String data)
			throws IOException, InterruptedException {

		LOGGER.info("\n\n Start Workflow with data: "+ data +"\n\n");

		JSONObject obj = (JSONObject) JSONValue.parse(data);
		String key = obj.getAsString("key");

		JSONObject variables = (JSONObject) obj.get("variables");

		final ProcessInstanceEvent event =
				client
						.newCreateInstanceCommand()
						.bpmnProcessId(key)
						.latestVersion()
						.variables(variables.toJSONString())
						.send()
						.join();

		LOGGER.info("Started instance for processDefinitionKey='{}', bpmnProcessId='{}', version='{}' with processInstanceKey='{}'"+
				event.getProcessDefinitionKey()+ event.getBpmnProcessId() + event.getVersion() +  event.getProcessInstanceKey());

		return new ResponseEntity<>(HttpStatus.OK);

	}
}