package io.camunda.getstarted.service.tasklist;

import io.camunda.tasklist.dto.Task;
import io.camunda.tasklist.exception.TaskListException;

import java.util.List;

public interface TaskListService {

    List<Task> getAssigneeTasks(String userId) throws TaskListException;

}
