package com.camunda.poc.starter.bpm;

import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.spin.Spin;
import org.camunda.spin.json.SpinJsonNode;
import org.camunda.spin.impl.json.jackson.JacksonJsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;
import static org.camunda.spin.Spin.JSON;
import org.json.JSONObject;

/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 * Spring-bean can be accessed as a Delegate Expression
 */
@Component("getInterpretationDelegate")
public class GetInterpretationDelegate implements JavaDelegate {

  @Value("${data.api.uri}")
  String dataApiUri;

  private Expression workflowPersistenceName;

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

    String objectTypeStr = "interpretations";

    //if interpretation ID is provided as a variable
    Integer interpretationID = (Integer) execution.getVariable("interpretationID");


    //if interpretation ID is provided as part of the object with only that value in it
    //JacksonJsonNode jsonInput = (JacksonJsonNode) execution.getVariable("interpretation");
    //String interpretationID = (String) jsonInput.prop("id").stringValue();

    String dataURI = dataApiUri + "/" +  objectTypeStr + "/" + interpretationID;
    LOGGER.info(" \n\n ====>> Data URI " + dataURI + "\n");
    //Use fluent HTTP api to execute PATCH request

    try {
      String content = Request.Get(dataURI).execute().returnContent().asString();
      SpinJsonNode jsonResponse = JSON(content);
      execution.setVariable("interpretation", jsonResponse);
    } catch (Exception e) {
      throw new Error("\n\n ====>> Invalid Response: Biz Database not updated!!!");
    }
  }
}