package com.camunda.poc.starter.poc.submission.bpm;

import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.logging.Logger;


/**
 * This is an easy adapter implementation 
 * illustrating how a Java Delegate can be used 
 * from within a BPMN 2.0 Service Task.
 */
@Component("confirmDamageCase")
public class ConfirmDamageCaseDelegate implements JavaDelegate {

  private String accessToken;

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

    if (accessToken == null) {
      String grant = requestSfOathGrant();
      LOGGER.info(" ====>> Salesforce Grant \n" + grant);
      //Parse JSON and get the workflow variables
      accessToken = new JSONObject(grant).getString("access_token");
    }

    //Use fluent HTTP api to get Damage Case from Salesforce
    String responseBody = querySfObject(accessToken);

    //Parse JSON and get the workflow variables
    JSONObject jsonObj = new JSONObject(responseBody);

    String caseId = null;
    for(int i=0;i<jsonObj.getJSONArray("records").length();i++) {
      JSONObject record = (JSONObject) jsonObj.getJSONArray("records").get(i);
      String key = execution.getBusinessKey();
      if (record.getString("SuppliedName").equalsIgnoreCase(key)) {
        LOGGER.info(" ====>> Damage Case \n"+ record);
        caseId = record.getString("CaseNumber");
      }
    }
    if (caseId == null){
      throw new Exception("Case Not Found!!!");
    }else{
      execution.setVariable("caseId", caseId);
    }

  }

  private String requestSfOathGrant() throws IOException {
    return Request.Post("https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9p1Q1BCe9GmA2i4VM2yUSqOZwtXNI7EjJpLAE6YVLn5UCrtU5XOk0FPz6CzDAUMZuuLLwjaV.hYtyGTHp&client_secret=C54081258696E282D2646A3AB276E793ADA3B73915C82B0B352FDCA0C8123049" +
            "&username=paullungu@camunda.com&password=Budwe1ser0MJWiTaYkeotUS9jiP1pHY39")
            .execute().returnContent().asString();
  }

  private String querySfObject(String accessToken) throws IOException {
    return Request.Get("https://camunda2-dev-ed.my.salesforce.com/services/data/v52.0/query?q=SELECT+Id,CaseNumber,Subject,SuppliedName+FROM+Case")
            .addHeader("Authorization", "Bearer "+accessToken)
            .execute().returnContent().asString();
  }


}
