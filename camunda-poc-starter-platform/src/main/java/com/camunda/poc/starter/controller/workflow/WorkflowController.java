package com.camunda.poc.starter.controller.workflow;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.logging.Logger;

@Profile("servicerequest")
@RestController
public class WorkflowController {

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	public WorkflowController() {
	}

	private RuntimeService runtimeService;
	private TaskService taskService;

	@Autowired
	public WorkflowController(RuntimeService runtimeService,
                              TaskService taskService) {
		this.runtimeService = runtimeService;
		this.taskService = taskService;
	}

	@RequestMapping(value = "/workflow/start", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> start(@RequestBody(required = true)String workflowKey,
											@RequestBody(required = true)String businessKey,
											@RequestBody(required = false)Map variables)
	{
		LOGGER.info("\n\n Start Workflow: "+ workflowKey +" with Business Key: "+businessKey);
		LOGGER.info("\n\n Workflow: "+ workflowKey +" with Variables: "+variables);

		runtimeService.correlateMessage("start-service-request", businessKey, variables);
		ResponseEntity<HttpStatus> response = new ResponseEntity<HttpStatus>(HttpStatus.OK);
		return response;
	}

	@RequestMapping(value = "/task/approve", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> approve(@RequestBody(required = true) String businessKey)
	{

		LOGGER.info("\n\n  Task Approval: "+ businessKey);

		Task task = taskService.createTaskQuery().processInstanceBusinessKey(businessKey).singleResult();
		taskService.complete(task.getId(), Variables.putValue("approved", true));

		LOGGER.info("\n\n  Complete Task with Approval"+ task.getName());

		ResponseEntity<HttpStatus> response = new ResponseEntity<HttpStatus>(HttpStatus.OK);
		return response;
	}

	@RequestMapping(value = "/task/reject", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> Reject(@RequestBody(required = true) String businessKey)
	{
		LOGGER.info("\n\n  Task Reject: "+ businessKey);

		Task task = taskService.createTaskQuery().processInstanceBusinessKey(businessKey).singleResult();
		taskService.complete(task.getId(), Variables.putValue("approved", false));

		LOGGER.info("\n\n  Complete Task with rejection"+ task.getName());

		ResponseEntity<HttpStatus> response = new ResponseEntity<HttpStatus>(HttpStatus.OK);
		return response;
	}

}