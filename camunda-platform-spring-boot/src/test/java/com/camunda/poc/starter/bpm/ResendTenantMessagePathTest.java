package com.camunda.poc.starter.bpm;

import static org.junit.Assert.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

//import com.camunda.poc.starter.usecase.renewal.RenewalUtil;
import org.apache.ibatis.logging.LogFactory;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.extension.process_test_coverage.junit.rules.TestCoverageProcessEngineRuleBuilder;
import org.camunda.bpm.engine.test.Deployment;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;


public class ResendTenantMessagePathTest extends RenewalRenewalTestBase{
	

	  @ClassRule
	  @Rule
	  public static ProcessEngineRule rule = TestCoverageProcessEngineRuleBuilder.create().build();

	  static {
	    LogFactory.useSlf4jLogging(); // MyBatis
	  }

	  @Before
	  public void setup() {
	    init(rule.getProcessEngine());
	  }

	@Test
	@Deployment(resources = { 
		     "renewal-process-example.bpmn"
			})	
	public void ResendTenantMessage() {
	
		/*
		 * Get the runtime service
		 * Start the process
		 * Set the initial params
		 */
		RuntimeService runtimeService = processEngine().getRuntimeService();
	
		LocalDate leaseExpirationDate = LocalDate.now().plusDays(51);

		
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("leaseExpirationDate", leaseExpirationDate);
		variables.put("leaseExpirationBufferDays", 50);
		variables.put("gracePeriod", 3);
		variables.put("message", "Do you want to renew your lease?");
		variables.put("tenants", "lungu77@gmail.com");
		variables.put("finalNoticeSent", false);
		variables.put("renewalConfirmed", false);
		variables.put("gracePeriodSettings", getGracePeriodSetting());

		ProcessInstance processInstance =
		  runtimeService.startProcessInstanceByKey("leaseRenewal", variables);
		
		//Task tests confirm the workflow is going through correct path
		/*
		    startEvent took 1 milliseconds
			getRemainingDays took 3 milliseconds
			noticeDecision took 69 milliseconds
			sendInitalTenantMessage took 2 milliseconds
			awaitTenantReply took 36480 milliseconds
			replyDecision took 0 milliseconds
			notifyAdmin took 14 milliseconds
			renewalStateDecision took 0 milliseconds
			confrimRenewalState took 120863 milliseconds
			awaitTenantReply took 36480 milliseconds
			
		 */
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "startEvent"));
//		getRemainingDaysTaskTest();
//		assertTrue("getRemainingDays", RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "getRemainingDays"));
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "noticeDecision"));
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "sendInitalTenantMessage"));
//		awaitTenantReplyTaskTest("lungu77@gmail.com");
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "awaitTenantReply"));
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "replyDecision"));
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "notifyAdmin"));
//		confrimRenewalStateTaskTest();
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "confrimRenewalState"));
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "renewalStateDecision"));
//		// Workflow back to await tenant reply because admin could not confirm renewal state
//		assertTrue(RenewalUtil.checkTaskActive(processEngine().getHistoryService(), processInstance.getId(), "awaitTenantReply"));
//
//		assertFalse(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "sendTenantConfirmation"));
//		assertFalse(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "end"));

	}

	@Override
	protected void confrimRenewalStateTaskTest(){
		TaskService taskService = processEngine().getTaskService();
	    Task task = taskService.createTaskQuery().singleResult();

		//TODO: Test getting the message from an email system
		//TODO: Test saving the message and associate to property and tenant
		
		Map<String, Object> variables = new HashMap<String, Object>();

		variables.put("renewalConfirmed", false);
		variables.put("message", "Sorry we can't help. Do you want to renew your lease?");
		//only need to set grace period if default is not sufficient during the final notice loop
		//variables.put("gracePeriod", gracePeriod);
		taskService.complete(task.getId(), variables);
	}
	
}
