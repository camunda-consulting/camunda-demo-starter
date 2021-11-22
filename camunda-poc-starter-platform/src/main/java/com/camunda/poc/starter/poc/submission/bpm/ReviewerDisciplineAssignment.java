package com.camunda.poc.starter.poc.submission.bpm;

import org.camunda.bpm.engine.delegate.*;
import org.json.JSONArray;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Component("reviewerDisciplineAssignment")
public class ReviewerDisciplineAssignment implements TaskListener {

  private final Logger LOGGER = Logger.getLogger(Class.class.getName());

  public void notify(DelegateTask delegateTask) {
    
    LOGGER.info("\n\n  ... "+Class.class.getName()+" invoked by "
            + "processDefinitionId=" + delegateTask.getProcessDefinitionId() +" \n "
            + ", taskName=" + delegateTask.getName() +" \n "
            + ", eventName='" + delegateTask.getEventName() + "'"+" \n "
            + ", processInstanceId=" + delegateTask.getProcessInstanceId()+" \n "
            + ", businessKey=" + delegateTask.getExecution().getProcessBusinessKey()+" \n "
            + ", taskId=" + delegateTask.getId()+" \n "
            + " \n\n");


    try {
      String rvrStr = (String) delegateTask.getVariable("disciplineReviewer");
      LOGGER.info("\n\n Reviewers String: "+rvrStr+"\n");

      List<String> rvrList = (ArrayList<String>) delegateTask.getVariable("reviewerList");

      if(rvrStr != null && !rvrStr.isEmpty()){
        //Use fluent HTTP api to get Damage Report
        if (rvrList == null)
          rvrList = new ArrayList<String>();

        rvrList.add(rvrStr);

        LOGGER.info("\n\n Reviewers List: "+rvrList+"\n");
      }

      delegateTask.setVariable("reviewerList", rvrList);

    }catch(Exception e){
          LOGGER.info("\n\n  ... "+Class.class.getSimpleName()+" just swallow exceptions");
          e.printStackTrace();
    }

    Boolean error = (Boolean) delegateTask.getVariable("error");
    if (error != null && error) {
      throw new BpmnError("Invalid Data Found!");
    }
  }
}
