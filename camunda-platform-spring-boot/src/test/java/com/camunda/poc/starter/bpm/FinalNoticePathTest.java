package com.camunda.poc.starter.bpm;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.test.Deployment;
import org.junit.Test;


import static org.camunda.bpm.engine.test.assertions.bpmn.AbstractAssertions.processEngine;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.assertThat;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.execute;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.job;



public class FinalNoticePathTest extends RenewalRenewalTestBase {
	
	@Test
	@Deployment(resources = { "processes/renewal-process-example.bpmn" })
	public void sendFinalNotice() {
	
		/*
		 * Get the runtime service
		 * Start the process
		 * Set the initial params
		 */
		RuntimeService runtimeService = processEngine().getRuntimeService();
	
		SimpleDateFormat dateFormatter = new SimpleDateFormat("MM/dd/yyyy");
        NumberFormat moneyFormatter = NumberFormat.getCurrencyInstance();

		List<String> emails = new ArrayList<String>();
		emails.add("lungu77@gmail.com");		
				
		Map<String, Object> variables = new HashMap<String, Object>();
		
		variables.put("endDate", dateFormatter.format(new Date()));
        variables.put("showDate", dateFormatter.format(new Date()));

		//To go down the final notice sent path remainingDays must be calculated
		//there-for the days between renewal expiration and the buffered days
		//must be <= 0
		//Setting the renewal expiration date to 50 as to create no wait time
        //between the buffer days and renewal expiration
		variables.put("leaseExpirationDate", getRenewalExpirationDate(50));
		variables.put("leaseExpirationBufferDays", 50);
		
		//the final notice sent flag must be false simulating the 
		//final notice has NOT been sent at least once
		variables.put("finalNoticeSent", false);
		variables.put("renewalConfirmed", true);
		
		variables.put("gracePeriodSettings", getGracePeriodSetting());
		variables.put("gracePeriod", 3);
		
		variables.put("oneYearOffer", moneyFormatter.format(1200F));
		variables.put("twoYearOffer", moneyFormatter.format(1000F));
		variables.put("message", "Do you want to renew your lease?");
		variables.put("tenants", emails);		
		variables.put("systemEmail", "noreply@system.com");
		variables.put("managerEmail", "somemanager@noreply.com");
		variables.put("defaultFromEmail", "somemanager@noreply.com");
		variables.put("recipients", "lungu77@gmail.com");
		variables.put("property", "1180 Atlantis Ave");

		
		ProcessInstance processInstance =
		  runtimeService.startProcessInstanceByKey(PROCESS_DEFINITION_KEY, variables);
		
  		assertThat(processInstance).isActive();

 		assertThat(processInstance).isWaitingAt("sendFinalNotice");
 		execute(job());
  		
  		assertThat(processInstance).isWaitingAt("awaitTenantReply");
  		processEngine().getRuntimeService().correlateMessage("tenant_reply_message");
  		
  		assertThat(processInstance).isActive();

	}
	
}
