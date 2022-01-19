package com.camunda.poc.starter.bpm;

import com.camunda.poc.starter.integration.pubsub.Event;
import com.camunda.poc.starter.integration.pubsub.EventChannels;
import org.apache.http.client.fluent.Request;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Profile("pubsub")
@Component("publishNotification")
public class PublishingNotificationListener implements ExecutionListener {

  private EventChannels source;

  @Autowired
  public PublishingNotificationListener(EventChannels source) {
    this.source = source;
  }

  public PublishingNotificationListener(){}

  private final Logger LOGGER = Logger.getLogger(Class.class.getName());
  
  public void notify(DelegateExecution execution) throws Exception {
    
    LOGGER.info("\n\n  ... "+Class.class.getName()+" invoked by "
            + "processDefinitionId=" + execution.getProcessDefinitionId() +" \n "
            + ", activtyId=" + execution.getCurrentActivityId() +" \n "
            + ", activtyName='" + execution.getCurrentActivityName() + "'"+" \n "
            + ", processInstanceId=" + execution.getProcessInstanceId()+" \n "
            + ", businessKey=" + execution.getProcessBusinessKey()+" \n "
            + ", executionId=" + execution.getId()+" \n "
            + " \n\n");

    Event event = new Event();
    event.setEventName(Event.START_WORKFLOW_EVENT);
    event.setCreated(new Date());
    event.setEventType(Event.START);
    Map<String, Object> params = new <String, Object>HashMap();
    JSONObject jsonWrokflowVars = new JSONObject();
    jsonWrokflowVars.put("businessKey", execution.getBusinessKey());
    jsonWrokflowVars.put("taskName", execution.getCurrentActivityName());
    jsonWrokflowVars.put("status", execution.getVariable("status"));
    params.put("processVariables", jsonWrokflowVars.toString());
    event.setEventParams(params);

    Boolean sent = source.publish().send(MessageBuilder.withPayload(event).build());
    if(sent) {
      LOGGER.info("\n\n Event Payload Sent: " + event + "\n");
    }else{
      throw new Exception("Event Not Sent: "+event);
    }

  }


}
