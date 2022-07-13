package io.camunda.getstarted.controller;

import io.camunda.getstarted.service.tasklist.TaskListService;
import io.camunda.tasklist.dto.Task;
import io.camunda.tasklist.exception.TaskListException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.logging.Logger;

@Profile("tasklist")
@Controller
public class TaskListController {

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	private final TaskListService taskListService;

	@Autowired
	public TaskListController(TaskListService taskListService) {
		this.taskListService = taskListService;
	}

	@RequestMapping(value = "/tasklist/getAssigneeTasks", method = RequestMethod.GET)
	public ResponseEntity<?> getAssigneeTasks(@RequestParam String userId) throws TaskListException {

		LOGGER.info("getTasks");

		List<Task> tasks = taskListService.getAssigneeTasks(userId);
		return new ResponseEntity<>(tasks, HttpStatus.OK);
	}

}
