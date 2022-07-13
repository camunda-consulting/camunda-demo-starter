package io.camunda.getstarted;

import io.camunda.getstarted.service.tasklist.TaskListService;
import io.camunda.tasklist.dto.Task;
import io.camunda.tasklist.exception.TaskListException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;

@SpringBootTest(classes = ProcessApplication.class)
public class TaskListTest {

    @Value("${zeebe.client.cloud.clusterId}")
    String clusterId;

    @Value("${zeebe.client.cloud.clientId}")
    String clientId;

    @Value("${zeebe.client.cloud.clientSecret}")
    String clientSecret;


    @Autowired
    TaskListService taskListService;

    @Test
    public void getTasks() throws TaskListException {

        List<Task> tasks = taskListService.getAssigneeTasks("2");
        Assertions.assertTrue(tasks.size() > 0);

    }
}
