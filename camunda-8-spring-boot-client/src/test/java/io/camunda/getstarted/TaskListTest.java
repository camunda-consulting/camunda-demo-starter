package io.camunda.getstarted;

import io.camunda.getstarted.service.tasklist.TaskListService;
import io.camunda.tasklist.dto.Form;
import io.camunda.tasklist.dto.Task;
import io.camunda.tasklist.exception.TaskListException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = ProcessApplication.class)
public class TaskListTest {


    @Autowired
    TaskListService taskListService;

    @Test
    public void getTasks() throws TaskListException {

        List<Task> tasks = taskListService.getAssigneeTasks("2");
        assertTrue(tasks.size() > 0);

        Task task = tasks.get(0);
        task = taskListService.getTask(task.getId());

        String taskKey = task.getFormKey();
        String processDefinitionId = task.getProcessDefinitionId();

        assertTrue(task.getFormKey() != null);

        Form form = taskListService.getFormByKey(taskKey, processDefinitionId);

        assertTrue(form.getSchema() != null);

    }


}
