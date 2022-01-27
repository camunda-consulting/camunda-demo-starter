package com.camunda.poc.starter.usecase.reading.bpm;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.spin.SpinList;
import org.camunda.spin.impl.json.jackson.JacksonJsonNode;
import org.camunda.spin.json.SpinJsonNode;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Component("getLastReadingDelegate")
public class GetLastReadingDelegate implements JavaDelegate {
 
  private final Logger LOGGER = Logger.getLogger(GetLastReadingDelegate.class.getName());
  
  public void execute(DelegateExecution execution) throws Exception {

    LOGGER.info("\n\n  ... "+Class.class.getName()+" invoked by "
            + "processDefinitionId=" + execution.getProcessDefinitionId()
            + ", activtyId=" + execution.getCurrentActivityId()
            + ", activtyName='" + execution.getCurrentActivityName() + "'"
            + ", processInstanceId=" + execution.getProcessInstanceId()
            + ", businessKey=" + execution.getProcessBusinessKey()
            + ", executionId=" + execution.getId()
            + " \n\n");

    List<String> readings = (List<String>) execution.getVariable("readings");
    LOGGER.info(" \n\n ====>> Readings:  " + readings.toString() + "\n");

    SpinJsonNode lastReading = SpinJsonNode.JSON(readings.get(0));
    for (String reading : readings){
      lastReading = compareReading(SpinJsonNode.JSON(reading), lastReading);
    }

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH);
    Date readingTime = formatter.parse(lastReading.prop("readingTime").stringValue());
    execution.setVariable("lastReadingTime", readingTime);
  }

  private SpinJsonNode compareReading(SpinJsonNode reading ,  SpinJsonNode lastReading) throws ParseException {
    String currentReadingStrVal = reading.prop("readingTime").stringValue();
    String lastReadingStrVal = lastReading.prop("readingTime").stringValue();

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH);

    Date currentReadingVal = formatter.parse(currentReadingStrVal);
    Date lastReadingVal = formatter.parse(lastReadingStrVal);

    if(currentReadingVal.after(lastReadingVal)){
      return reading;
    }
    return lastReading;
  }
}
