package com.camunda.poc.starter.bpm;

import org.apache.http.client.fluent.Request;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.spin.Spin;
import org.camunda.spin.json.SpinJsonNode;
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
  private Expression bizObjectName;

  //Use Camunda field injection to get the value from the workflow config
  private Expression searchTerm;

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

    //Get the Spin Json object from the Camunda field injection expression
    SpinJsonNode bizObj = BpmUtil.getBizObjectNode(execution, bizObject);

    //Get the searchTerm string from the field injection expression
    String searchTermStr = BpmUtil.getSearchTermString(execution, searchTerm);

    //build the dataURI for the api endpoint
    Integer id = (Integer) bizObj.prop("id").numberValue();
    String dataURI = dataApiUri + "/" + searchTermStr + "/" + id;
    LOGGER.info(" \n\n ====>> Data URI " + dataURI + "\n");

    try {
      //Use fluent HTTP api to execute request
      String content = Request.Get(dataURI).execute().returnContent().asString();
      LOGGER.info(" \n\n ====>> Response Body " + content + "\n");
      //convert the response into SpinJsonNode
      SpinJsonNode bizObjResponse = Spin.S(content);

      //set the businessKey into the business object
      bizObj = BpmUtil.setBusinessKey(execution, bizObjResponse);

      //Set the business object into Camunda execution
      BpmUtil.setBizObject(execution, bizObjectName, bizObjResponse);

    } catch (Exception e) {
      throw new Error("\n\n ====>> Error: Biz Data Search Failed for term: " +searchTermStr);
    }
  }
}