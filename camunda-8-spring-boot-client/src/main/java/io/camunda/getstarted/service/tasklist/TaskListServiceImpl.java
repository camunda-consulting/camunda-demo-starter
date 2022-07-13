package io.camunda.getstarted.service.tasklist;

import io.camunda.tasklist.CamundaTaskListClient;
import io.camunda.tasklist.auth.SaasAuthentication;
import io.camunda.tasklist.dto.Task;
import io.camunda.tasklist.dto.TaskState;
import io.camunda.tasklist.exception.TaskListException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

@Profile("tasklist")
@Service
public class TaskListServiceImpl implements TaskListService {

    @Value("${zeebe.client.cloud.clusterId}")
    String clusterId;

    @Value("${zeebe.client.cloud.clientId}")
    String clientId;

    @Value("${zeebe.client.cloud.clientSecret}")
    String clientSecret;

    CamundaTaskListClient client;

    public TaskListServiceImpl() throws TaskListException {

    }

    private CamundaTaskListClient getClient() throws TaskListException {
        if(client == null) {
            SaasAuthentication sa = new SaasAuthentication(clientId, clientSecret);
            client = new CamundaTaskListClient.Builder().authentication(sa)
                    .taskListUrl("https://bru-2.tasklist.camunda.io/" + clusterId + "/graphql").build();
        }
        return client;
    }

    public List<Task> getAssigneeTasks(String userId) throws TaskListException {
        return getClient().getAssigneeTasks(userId, TaskState.CREATED, 50, true);
    }

}
