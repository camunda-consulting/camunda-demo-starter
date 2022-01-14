package com.camunda.poc.starter.bpm;

import org.apache.http.client.fluent.Request;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Component("validateReport")
public class GetSearchDelegate implements JavaDelegate {

  @Value("${data.api.uri}")
  String dataApiUri;

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


    try {
      //Use fluent HTTP api to get Damage Report
      String request = Request.Get(dataApiUri + "/damageReports/search/findDamageReportByDamageKey?damageKey=" + execution.getBusinessKey()).execute().returnContent().asString();
      //Parse JSON and get the workflow variables
      JSONObject reportJson = new JSONObject(request);
      execution.setVariable("responsible", reportJson.get("responsible"));

      LOGGER.info(" ====>> Damage Report \n" + request);
    }catch(Exception e){
          LOGGER.info("\n\n  ... "+Class.class.getName()+" just swallow exceptions");
    }

    Boolean error = (Boolean) execution.getVariable("error");
    if (error != null && error) {
      throw new BpmnError("Invalid Data Found!");
    }
  }


}
