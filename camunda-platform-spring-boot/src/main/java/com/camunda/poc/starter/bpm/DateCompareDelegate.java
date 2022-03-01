package com.camunda.poc.starter.bpm;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.spin.json.SpinJsonNode;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Component("dateCompareDelegate")
public class DateCompareDelegate implements JavaDelegate {
 
  private final Logger LOGGER = Logger.getLogger(DateCompareDelegate.class.getName());

  //Use Camunda field injection to get the value from the workflow config
  private Expression bizObjectName;

  private Expression bizPropName;

  public void execute(DelegateExecution execution) throws Exception {

    LOGGER.info("\n\n  ... "+Class.class.getName()+" invoked by "
            + "processDefinitionId=" + execution.getProcessDefinitionId()
            + ", activtyId=" + execution.getCurrentActivityId()
            + ", activtyName='" + execution.getCurrentActivityName() + "'"
            + ", processInstanceId=" + execution.getProcessInstanceId()
            + ", businessKey=" + execution.getProcessBusinessKey()
            + ", executionId=" + execution.getId()
            + " \n\n");

    // Get the name of the biz object string to get from Camunda execution
    String bizObjNameStr = BpmUtil.getBizObjectNameString(execution, bizObjectName);

    // Get the biz property name to use - it should be a date string
    String bizPropNameStr = BpmUtil.getBizObjectNameString(execution, bizPropName);

    // actually use the bizObjNameStr to get the biz object(s) from Camunda execution
    // you could also get this fomr a data API instead of Camunda execution
    List<String> objs = (List<String>) execution.getVariable(bizObjNameStr);
    LOGGER.info(" \n\n ====>> Biz Objs:  " + objs.toString() + "\n");

    SpinJsonNode latest = SpinJsonNode.JSON(objs.get(0));
    for (String obj : objs){
      latest = getLatestNodeByDate(SpinJsonNode.JSON(obj), latest, bizPropNameStr);
    }

    // Do something with the latest biz object
    // ... execution.setVariable("lastBizObjByTime", latest);
    LOGGER.info(" \n\n ====>> Latest Biz Obj By Date:  " + latest.toString() + "\n");

  }

  private SpinJsonNode getLatestNodeByDate(SpinJsonNode current,  SpinJsonNode last, String bizPropNameStr) throws ParseException {
    String currentReadingStrVal = current.prop(bizPropNameStr).stringValue();
    String lastStrVal = last.prop(bizPropNameStr).stringValue();

    Date currentReadingVal = BpmUtil.formatDate(currentReadingStrVal);
    Date lastVal = BpmUtil.formatDate(lastStrVal);

    if(currentReadingVal.after(lastVal)){
      return current;
    }
    return last;
  }
}
