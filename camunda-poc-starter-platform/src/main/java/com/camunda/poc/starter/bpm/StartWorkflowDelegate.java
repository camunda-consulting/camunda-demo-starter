package com.camunda.poc.starter.bpm;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.variable.Variables;
import org.camunda.spin.impl.json.jackson.JacksonJsonNode;
import org.camunda.spin.plugin.variable.SpinValues;
import org.camunda.spin.plugin.variable.value.JsonValue;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Component("startWorkflowDelegate")
public class StartWorkflowDelegate implements JavaDelegate {

  private final Logger LOGGER = Logger.getLogger(StartWorkflowDelegate.class.getName());

  private RuntimeService runtimeService;

  @Autowired
  public StartWorkflowDelegate(RuntimeService runtimeService){
    this.runtimeService = runtimeService;
  }

  //Use Camunda field injection to get the value from the workflow config
  private Expression bizObject;

  //Use Camunda field injection to get the value from the workflow config
  private Expression bizObjectName;

  //Use Camunda field injection to get the value from the workflow config
  private Expression workflowKey;

  public void execute(DelegateExecution execution) throws Exception {

    LOGGER.info("\n\n  ... "+Class.class.getName()+" invoked by "
            + "processDefinitionId=" + execution.getProcessDefinitionId()
            + ", activtyId=" + execution.getCurrentActivityId()
            + ", activtyName='" + execution.getCurrentActivityName() + "'"
            + ", processInstanceId=" + execution.getProcessInstanceId()
            + ", businessKey=" + execution.getProcessBusinessKey()
            + ", executionId=" + execution.getId()
            + " \n\n");

    //Get the business object
    JsonValue jsonValue = null;
    if (bizObject != null) {
      JacksonJsonNode bizObj = (JacksonJsonNode) bizObject.getValue(execution);
      LOGGER.info(" \n\n ====>> Biz Object " + bizObj.toString() + "\n");
      //Use Camunda Value Type API to create a Json Object
      jsonValue = SpinValues.jsonValue(bizObj).create();
    } else {
      throw new Exception("Business Object Doesn't Exist, please set the bizObject Expression");
    }

    //Get the name of the object to presist in the workflow
    String bizObjectNameStr = null;
    if (bizObjectName != null) {
      bizObjectNameStr = bizObjectName.getValue(execution).toString();
    }else {
      throw new Exception("No name defined to persist object in workflow, please set the bizObjectName");
    }

    String wfKey = null;
    if (workflowKey != null) {
      wfKey = workflowKey.getValue(execution).toString();
    }else {
      throw new Exception("No name defined to persist object in workflow, please set the bizObjectName");
    }

    String businessKey = (String) execution.getBusinessKey();
    if (businessKey == null) {
      throw new Exception("No BusinessKey set in workflow, please set the BusinessKey");
    }

    //Use Camunda Message API to start the workflow
    runtimeService.correlateMessage(
            wfKey,
            businessKey,
            //Pass the JSON Object to Camunda starting the workflow
            Variables.createVariables()
                    .putValueTyped(bizObjectNameStr, jsonValue)
    );

  }
}