package com.camunda.poc.starter.bpm;

import org.apache.http.client.fluent.Request;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.variable.Variables;
import org.camunda.bpm.engine.variable.impl.value.ObjectValueImpl;
import org.camunda.spin.Spin;
import org.camunda.spin.SpinList;
import org.camunda.spin.json.SpinJsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Component("getSearchDelegate")
public class GetSearchDelegate implements JavaDelegate {

  @Value("${data.api.uri}")
  String dataApiUri;

  private final Logger LOGGER = Logger.getLogger(Class.class.getName());

  //Use Camunda field injection to get the value from the workflow config
  private Expression bizObjectName;

  //Use Camunda field injection to get the value from the workflow config
  private Expression searchTerm;

  //Camunda Overriden marker API
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

    //Get the searchTerm string from the field injection expression
    String searchTermStr = BpmUtil.getSearchTermString(execution, searchTerm);

    String dataURI = dataApiUri + "/" + searchTermStr;
    LOGGER.info(" \n\n Data Search URI " + dataURI + "\n");

    try {
      //Use fluent HTTP api to execute request
      String content = Request.Get(dataURI).execute().returnContent().asString();
      LOGGER.info(" \n\n ====>> Response Body " + content + "\n");
      //convert the response into SpinJsonNode
      SpinJsonNode bizObjResponse = Spin.JSON(content);

      if (bizObjResponse != null) {
        LOGGER.info(" \n\n Biz Object " + bizObjResponse.toString() + "\n");
        //get the elements out of the object as SpinObjects
        SpinList<SpinJsonNode> spinList = bizObjResponse.prop("_embedded").prop(searchTermStr).elements();

        ObjectValueImpl objList = BpmUtil.createSerializableList(spinList);

        //Set the business object into Camunda execution
        BpmUtil.setBizObject(execution, bizObjectName, objList);
      }

    } catch (Exception e) {
      throw new Error("\n\n Biz Data Search Failed for term: " +searchTermStr);
    }
  }
}
