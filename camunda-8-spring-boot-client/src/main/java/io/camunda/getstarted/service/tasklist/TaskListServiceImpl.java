package io.camunda.getstarted.service.tasklist;

import io.camunda.tasklist.CamundaTaskListClient;
import io.camunda.tasklist.auth.SaasAuthentication;
import io.camunda.tasklist.dto.Form;
import io.camunda.tasklist.dto.Task;
import io.camunda.tasklist.dto.TaskState;
import io.camunda.tasklist.exception.TaskListException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    public Task getTask(String taskId) throws TaskListException {
        return getClient().getTask(taskId);
    }

    public Form getFormById(String formId, String processDefinitionId) throws TaskListException {
        return getClient().getForm(formId, processDefinitionId);
    }

    public Form getFormByKey(String formKey, String processDefinitionId) throws TaskListException {
        String formId = parseFormIdFromKey(formKey);
        return getFormById(formId, processDefinitionId);
    }

    static String parseFormIdFromKey(String formKey) {
        Pattern pattern = Pattern.compile("[^:]+:[^:]+:(.*)");
        Matcher matcher = pattern.matcher(formKey);
        while(matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }


}
