package com.camunda.poc.starter.bpm;

import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.apache.http.entity.ContentType;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.spin.impl.json.jackson.JacksonJsonNode;
import org.camunda.spin.plugin.variable.value.JsonValue;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;
import java.util.UUID;
import static org.camunda.spin.Spin.JSON;
import java.util.Map;
import java.util.HashMap;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 * Spring-bean can be accessed as a Delegate Expression
 */
@Component("postDelegate")
public class PostDelegate implements JavaDelegate {

  @Value("${data.api.uri}")
  String dataApiUri;

   private final Logger LOGGER = Logger.getLogger(Class.class.getName());
  
  public void execute(DelegateExecution execution) throws Exception {

    LOGGER.info("\n\n  ... " + Class.class.getName() + " invoked by "
            + "processDefinitionId=" + execution.getProcessDefinitionId() + " \n "
            + ", activtyId=" + execution.getCurrentActivityId() + " \n "
            + ", activtyName='" + execution.getCurrentActivityName() + "'" + " \n "
            + ", processInstanceId=" + execution.getProcessInstanceId() + " \n "
            + ", businessKey=" + execution.getProcessBusinessKey() + " \n "
            + ", executionId=" + execution.getId() + " \n "
            + ", Data URI= " + dataApiUri
            + " \n\n");

    UUID uuid = UUID.randomUUID();
    Map<String, Object> pathway = (HashMap<String, Object>) execution.getVariable("pathwayResult");
    String determinedPathway = (String) pathway.get("pathway");
    String determinedReason = (String) pathway.get("reason");

    JSONObject interpretJo = new JSONObject();
    interpretJo.put("key", uuid.toString());
    interpretJo.put("status", determinedPathway);
    interpretJo.put("reason", determinedReason);
    LOGGER.info("\n\n  ...JSON PAYLOAD: " + interpretJo.toString());

    //Use fluent HTTP api to execute Post request
    HttpResponse response = Request.Post(dataApiUri + "/" + "interpretations"+ "/")
            .bodyString(interpretJo.toString(), ContentType.APPLICATION_JSON)
            .execute().returnResponse();

    LOGGER.info(" \n\n ====>> Response " + response.getStatusLine().toString() + "\n");

    if (response.getStatusLine().getStatusCode() == 200
            || response.getStatusLine().getStatusCode() == 202
            || response.getStatusLine().getStatusCode() == 204) {

    }
  }
}