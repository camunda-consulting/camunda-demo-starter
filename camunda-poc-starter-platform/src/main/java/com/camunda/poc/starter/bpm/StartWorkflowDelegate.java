package com.camunda.poc.starter.bpm;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.variable.Variables;
import org.camunda.spin.impl.json.jackson.JacksonJsonNode;
import org.camunda.spin.json.SpinJsonNode;
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

  //Camunda Overriden marker API
  public void execute(DelegateExecution execution) throws Exception {

    LOGGER.info("\n\n  ... "+Class.class.getName()+" invoked by "
            + "processDefinitionId=" + execution.getProcessDefinitionId()
            + ", activtyId=" + execution.getCurrentActivityId()
            + ", activtyName='" + execution.getCurrentActivityName() + "'"
            + ", processInstanceId=" + execution.getProcessInstanceId()
            + ", businessKey=" + execution.getProcessBusinessKey()
            + ", executionId=" + execution.getId()
            + " \n\n");

    //Get the Spin Json object from the Camunda field injection expression
    SpinJsonNode bizObj = BpmUtil.getBizObjectNode(execution, bizObject);

    bizObj = BpmUtil.setBusinessKey(execution, bizObj);

    //Get the business object
    JsonValue jsonValue = SpinValues.jsonValue(bizObj).create();

    String wfKey = BpmUtil.getWorkflowKey(execution, workflowKey);

    String bizObjectNameStr = BpmUtil.getBizObjectNameString(execution, bizObjectName);

    //Use Camunda Message API to start the workflow
    runtimeService.correlateMessage(
            wfKey,
            bizObj.prop("key").stringValue(),
            //Pass the JSON Object to Camunda starting the workflow
            Variables.createVariables()
                    .putValueTyped(bizObjectNameStr, jsonValue)
    );

  }
}