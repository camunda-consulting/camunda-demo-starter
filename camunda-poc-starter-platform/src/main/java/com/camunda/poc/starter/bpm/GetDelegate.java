package com.camunda.poc.starter.bpm;

import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.spin.Spin;
import org.camunda.spin.impl.json.jackson.JacksonJsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 * Spring-bean can be accessed as a Delegate Expression
 */
@Component("getDelegate")
public class GetDelegate implements JavaDelegate {

  @Value("${data.api.uri}")
  String dataApiUri;

  //get the dynamic object to be updated
  private Expression bizObject;

  //get the value of the type of object to submit
  private Expression objectType;

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

    //Get the business object
    JacksonJsonNode bizObj = (JacksonJsonNode) bizObject.getValue(execution);

    //poc demo purposes to show things like exception and error handliing in the process
    Boolean error = (Boolean) execution.getVariable("error");
    Boolean exception = (Boolean) execution.getVariable("exception");

    if (bizObj != null) {
      LOGGER.info(" \n\n ====>> Biz Object " + bizObj.toString() + "\n");

      Integer id = (Integer) bizObj.prop("id").numberValue();
      String objectTypeStr = objectType.getValue(execution).toString();

      String dataURI = dataApiUri + "/" + objectTypeStr + "/" + id;
      LOGGER.info(" \n\n ====>> Data URI " + dataURI + "\n");
      //Use fluent HTTP api to execute PATCH request

      try {
        String content = Request.Get(dataURI).execute().returnContent().asString();

        bizObj = Spin.S(content);

        LOGGER.info(" \n\n ====>> Response Body " + content + "\n");

        if (bizObj != null) {

          LOGGER.info(" \n\n ====>> Biz Object " + bizObj.toString() + "\n");

          String workflowPersistenceNameStr = workflowPersistenceName.getValue(execution).toString();

          if (workflowPersistenceNameStr != null) {
            execution.setVariable(workflowPersistenceNameStr, bizObj);
          } else {
            execution.setVariable(objectTypeStr, bizObj);
          }
        }

      } catch (Exception e) {
        throw new Error("\n\n ====>> Invalid Response: Biz Database not updated!!!");
      }

      if (error != null && error)
      {
        throw new BpmnError("Invalid Data Found!");
      }
      else if (exception != null && exception)
      {
        throw new Exception("Unknown Exception Detected. Service may be down!!!");
      }
    }
  }
}