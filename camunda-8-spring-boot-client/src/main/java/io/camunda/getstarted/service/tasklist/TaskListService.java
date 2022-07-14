package io.camunda.getstarted.service.tasklist;

import io.camunda.tasklist.dto.Form;
import io.camunda.tasklist.dto.Task;
import io.camunda.tasklist.exception.TaskListException;

import java.util.List;

public interface TaskListService {

    List<Task> getAssigneeTasks(String userId) throws TaskListException;
    Task getTask(String taskId) throws TaskListException;
    Form getFormById(String formId, String processDefinitionId) throws TaskListException;
    Form getFormByKey(String formKey, String processDefinitionId) throws TaskListException;

}
