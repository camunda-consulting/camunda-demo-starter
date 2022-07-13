package io.camunda.getstarted.controller;

import io.camunda.zeebe.client.api.response.PublishMessageResponse;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import io.camunda.zeebe.spring.client.EnableZeebeClient;
import io.camunda.zeebe.spring.client.ZeebeClientLifecycle;
import io.camunda.zeebe.client.api.response.ProcessInstanceEvent;

import java.io.IOException;
import java.util.concurrent.CompletionStage;
import java.util.logging.Logger;

@EnableZeebeClient
@Controller
public class WorkflowController {

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	private ZeebeClientLifecycle client;

	@Autowired
	public WorkflowController(ZeebeClientLifecycle client ) {
		this.client = client;
	}

	@RequestMapping(value = "/workflow/health", method = RequestMethod.GET)
	public ResponseEntity<?> health() throws IOException, InterruptedException {

		return new ResponseEntity<>("All systems go", HttpStatus.OK);
	}

	/**
	 * Start a workflow sync with REST
	 * @param data
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/start", method = RequestMethod.POST, consumes = {"application/json"})
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


	/**
	 * Start a workflow sync with REST
	 * @param data
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/correlate/message", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<?> correlate(@RequestBody(required = true)String data)
			throws IOException, InterruptedException {

		LOGGER.info("\n\n Start Workflow with data: "+ data +"\n\n");

		JSONObject obj = (JSONObject) JSONValue.parse(data);
		String key = obj.getAsString("key");
		String name = obj.getAsString("name");

		JSONObject variables = (JSONObject) obj.get("variables");

		final CompletionStage<PublishMessageResponse> response =
				client
				.newPublishMessageCommand()
				  .messageName(name)
				  .correlationKey(key)
				  .variables(variables.toJSONString())
				  .send()
				  .exceptionally( throwable -> {
							throw new RuntimeException("Could not publish message " + name, throwable);
						});

//		LOGGER.info("Message correlated for processDefinitionKey='{}', bpmnProcessId='{}', version='{}' with processInstanceKey='{}'"+
//				response.getProcessDefinitionKey()+ event.getBpmnProcessId() + event.getVersion() +  event.getProcessInstanceKey());

		return new ResponseEntity<>(HttpStatus.OK);

	}

}
