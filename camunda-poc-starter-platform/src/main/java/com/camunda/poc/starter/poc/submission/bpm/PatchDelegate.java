package com.camunda.poc.starter.poc.submission.bpm;

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

import static org.camunda.spin.Spin.JSON;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 * Spring-bean can be accessed as a Delegate Expression
 */
@Component("patchDelegate")
public class PatchDelegate implements JavaDelegate {

  @Value("${data.api.uri}")
  String dataApiUri;

  //get the dynamic object to be updated
  private Expression bizObject;

  //get the value of the type of object to submit
  private Expression objectType;

  private final Logger LOGGER = Logger.getLogger(Class.class.getName());
  
  public void execute(DelegateExecution execution) throws Exception {
    
    LOGGER.info("\n\n  ... "+Class.class.getName()+" invoked by "
            + "processDefinitionId=" + execution.getProcessDefinitionId() +" \n "
            + ", activtyId=" + execution.getCurrentActivityId() +" \n "
            + ", activtyName='" + execution.getCurrentActivityName() + "'"+" \n "
            + ", processInstanceId=" + execution.getProcessInstanceId()+" \n "
            + ", businessKey=" + execution.getProcessBusinessKey()+" \n "
            + ", executionId=" + execution.getId()+" \n "
            + ", Data URI= " + dataApiUri
            + " \n\n");

      //Get the business object
      JacksonJsonNode bizObj = (JacksonJsonNode) bizObject.getValue(execution);
      Integer id = (Integer) bizObj.prop("id").numberValue();

      String objectTypeStr = objectType.getValue(execution).toString();

      //Use fluent HTTP api to execute PATCH request
      HttpResponse response = Request.Patch(dataApiUri + "/"+objectTypeStr+"/"+id)
              .bodyString(bizObj.toString(), ContentType.APPLICATION_JSON)
              .execute().returnResponse();

      LOGGER.info(" ====>> Response \n\n" + response.getStatusLine().toString() + "\n");

      if (response.getStatusLine().getStatusCode() == 200
          || response.getStatusLine().getStatusCode() == 202
          || response.getStatusLine().getStatusCode() == 204)
      {
        bizObj.prop("id", id);
        execution.setVariable("submission", bizObj);
      } else {
        throw new Exception("Invalid Response");
      }

      Boolean error = (Boolean) execution.getVariable("error");
      if (error != null && error) {
        throw new BpmnError("Invalid Data Found!");
      }
  }
}