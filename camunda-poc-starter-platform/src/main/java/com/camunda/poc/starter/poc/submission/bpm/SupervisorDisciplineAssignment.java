package com.camunda.poc.starter.poc.submission.bpm;

import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.spin.plugin.variable.value.JsonValue;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Component("supervisorDisciplineAssignment")
public class SupervisorDisciplineAssignment implements JavaDelegate {

  private final Logger LOGGER = Logger.getLogger(Class.class.getName());
  
  public void execute(DelegateExecution execution) throws Exception {
    
    LOGGER.info("\n\n  ... "+Class.class.getName()+" invoked by "
            + "processDefinitionId=" + execution.getProcessDefinitionId() +" \n "
            + ", activtyId=" + execution.getCurrentActivityId() +" \n "
            + ", activtyName='" + execution.getCurrentActivityName() + "'"+" \n "
            + ", processInstanceId=" + execution.getProcessInstanceId()+" \n "
            + ", businessKey=" + execution.getProcessBusinessKey()+" \n "
            + ", executionId=" + execution.getId()+" \n "
            + " \n\n");


    try {
      String supsStr = (String) execution.getVariable("supervisors");
      LOGGER.info("\n\n Supervisors String: "+supsStr+"\n");

      JSONArray supsJsonArr = new JSONArray(supsStr);

      LOGGER.info("\n\n Supervisors JSON: "+supsStr+"\n");

      List<String> supsList = new ArrayList<String>();
      for (int i=0;i<supsJsonArr.length();i++) {
          supsList.add(supsJsonArr.getString(i));
      }

      if(supsList != null && supsList.size() > 0){
        //Use fluent HTTP api to get Damage Report
        execution.setVariable("supervisorList", supsList);
        LOGGER.info("\n\n Supervisors List: "+supsList+"\n");
      }

    }catch(Exception e){
          LOGGER.info("\n\n  ... "+Class.class.getSimpleName()+" just swallow exceptions");
          e.printStackTrace();
    }

    Boolean error = (Boolean) execution.getVariable("error");
    if (error != null && error) {
      throw new BpmnError("Invalid Data Found!");
    }
  }


}
