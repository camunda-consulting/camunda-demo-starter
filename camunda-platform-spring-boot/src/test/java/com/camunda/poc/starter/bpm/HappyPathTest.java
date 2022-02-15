package com.camunda.poc.starter.bpm;

import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.test.Deployment;
import org.junit.Test;

import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.camunda.bpm.engine.RuntimeService;

public class HappyPathTest extends RenewalRenewalTestBase{
	
	@Test
	@Deployment(resources = { 
     "processes/renewal-process-example.bpmn"
	})
	
	public void happyPath(){
			    	
		/*
		 * Get the runtime service
		 * Start the process
		 * Set the initial params
		 */
		RuntimeService runtimeService = processEngine().getRuntimeService();
	
		Date leaseExpirationDate = getRenewalExpirationDate(100);
        SimpleDateFormat dateFormatter = new SimpleDateFormat("MM/dd/yyyy");
        NumberFormat moneyFormatter = NumberFormat.getCurrencyInstance();

		List<String> emails = new ArrayList<String>();
		emails.add("lungu77@gmail.com");		
				
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("leaseExpirationDate", leaseExpirationDate);
		variables.put("leaseExpirationBufferDays", 50);
		variables.put("gracePeriod", "0/5 * * * * ?");
		variables.put("message", "Do you want to renew your lease?");
		variables.put("finalNoticeSent", false);
		variables.put("renewalConfirmed", true);
		variables.put("tenants", emails);
		variables.put("systemEmail", "noreply@system.com");
		variables.put("managerEmail", "somemanager@noreply.com");
		variables.put("defaultFromEmail", "somemanager@noreply.com");
		variables.put("recipients", "lungu77@gmail.com");
		variables.put("gracePeriodSettings", getGracePeriodSetting());
		variables.put("property", "1180 Atlantis Ave");
		variables.put("endDate", dateFormatter.format(new Date()));
		variables.put("oneYearOffer", moneyFormatter.format(1000F));
		variables.put("twoYearOffer", moneyFormatter.format(1000F));
        variables.put("showDate", dateFormatter.format(new Date()));

		
		ProcessInstance processInstance =
		  runtimeService.startProcessInstanceByKey(PROCESS_DEFINITION_KEY, variables);
		
  		assertThat(processInstance).isActive();

 		assertThat(processInstance).isWaitingAt("sendInitalTenantMessage");
 		execute(job());
  		
  		assertThat(processInstance).isWaitingAt("awaitTenantReply");
  		processEngine().getRuntimeService().correlateMessage("tenant_reply_message");

 		assertThat(processInstance).isWaitingAt("notifyPropertyManager");
 		execute(job());

  		assertThat(processInstance).isWaitingAt("confrimRenewalState");  		
  		complete(task(), withVariables("renewalConfirmed", true));

 		assertThat(processInstance).isWaitingAt("sendTenantConfirmation");
 		execute(job());
  		
  		assertThat(processInstance).isEnded();

	}
	
}
