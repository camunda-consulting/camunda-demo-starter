package com.camunda.poc.starter.controller.engine;

import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.ProcessEngineConfiguration;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
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

@Profile("poc")
@RestController
public class EngineController {

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	public EngineController() {
	}

	private ProcessEngineConfigurationImpl processEngineConfiguration;

	@Autowired
	public EngineController(ProcessEngineConfigurationImpl processEngineConfiguration) {
		this.processEngineConfiguration = processEngineConfiguration;
	}

	@RequestMapping(value = "/engine/jobs/start", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> start(@RequestBody(required = false)Map params)
	{
		LOGGER.info("\n\n Engine: Stop Job Executor: with params: "+params);

		processEngineConfiguration.getJobExecutor().start();

		Boolean active = processEngineConfiguration.isJobExecutorActivate();
		LOGGER.info("\n\n Engine: Job Executor Started : "+ active);

		ResponseEntity<HttpStatus> response;
		if (active)
			response = new ResponseEntity<HttpStatus>(HttpStatus.OK);
		else
			response = new ResponseEntity<HttpStatus>(HttpStatus.NOT_MODIFIED);

		return response;
	}

	@RequestMapping(value = "/engine/jobs/stop", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<HttpStatus> stop(@RequestBody(required = false)Map params)
	{
		LOGGER.info("\n\n Stop Engine: with params: "+params);

		processEngineConfiguration.getJobExecutor().shutdown();


		Boolean active = processEngineConfiguration.isJobExecutorActivate();
		LOGGER.info("\n\n Engine: Job Executor Stopped : "+ !active);

		ResponseEntity<HttpStatus> response;
		if (!active)
			response = new ResponseEntity<HttpStatus>(HttpStatus.OK);
		else
			response = new ResponseEntity<HttpStatus>(HttpStatus.NOT_MODIFIED);

		return response;
	}

}