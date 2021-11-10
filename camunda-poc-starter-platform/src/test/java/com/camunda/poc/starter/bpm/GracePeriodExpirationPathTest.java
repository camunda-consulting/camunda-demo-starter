package com.camunda.poc.starter.bpm;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import com.camunda.poc.starter.usecase.renewal.RenewalUtil;
import org.apache.ibatis.logging.LogFactory;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.extension.process_test_coverage.junit.rules.TestCoverageProcessEngineRuleBuilder;
import org.camunda.bpm.engine.test.Deployment;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;

import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*;

public class GracePeriodExpirationPathTest extends RenewalRenewalTestBase{

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
		     "processes/renewal-process-example.bpmn"
			})
	public void GracePeriodStaggerLessThan11DaysTillExpiration() {
		/*
		 * Get the runtime service
		 * Start the process
		 * Set the initial params
		 */
		RuntimeService runtimeService = processEngine().getRuntimeService();
	
		//Test message expiration 1 - 10  days before expiration
		Date leaseExpirationDate = getRenewalExpirationDate(51);
		List<String> emails = new ArrayList<String>();
		emails.add("lungu77@gmail.com");
		
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("leaseExpirationDate", leaseExpirationDate);
		variables.put("leaseExpirationBufferDays", 50);
		variables.put("message", "Do you want to renew your lease?");
		variables.put("finalNoticeSent", false);
		variables.put("renewalConfirmed", false);
		variables.put("tenants", emails);
		variables.put("recipiants", "lungu77@gmail.com");
		variables.put("gracePeriodSettings", getGracePeriodSetting());

		ProcessInstance processInstance =
		  runtimeService.startProcessInstanceByKey("leaseRenewal", variables);
		
		//Task tests confirm the workflow is going through correct path
		try {
			Thread.sleep(30000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "startEvent"));
//		getRemainingDaysTaskTest();
//		assertTrue(RenewalUtil.checkTaskActive(processEngine().getHistoryService(), processInstance.getId(), "awaitTenantReply"));
//		//awaitTenantReplyTaskTest();
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "getRemainingDays")>1);
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "noticeDecision")>1);
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "sendInitalTenantMessage")>1);
		
	}

	@Test
	@Deployment(resources = { 
		     "processes/renewal-process-example.bpmn"
			})
	public void GracePeriodStaggerLessThan21DaysTillExpiration() {
		/*
		 * Get the runtime service
		 * Start the process
		 * Set the initial params
		 */
		RuntimeService runtimeService = processEngine().getRuntimeService();
	
		//Test message cantor 11 to 20 days before deadline
		Date leaseExpirationDate = getRenewalExpirationDate(65);
		List<String> emails = new ArrayList<String>();
		emails.add("lungu77@gmail.com");
		
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("leaseExpirationDate", leaseExpirationDate);
		variables.put("leaseExpirationBufferDays", 50);
		variables.put("message", "Do you want to renew your lease?");
		variables.put("finalNoticeSent", false);
		variables.put("renewalConfirmed", false);
		variables.put("tenants", emails);
		variables.put("recipiants", "lungu77@gmail.com");
		
		ProcessInstance processInstance =
		  runtimeService.startProcessInstanceByKey("leaseRenewal", variables);
		
		//Task tests confirm the workflow is going through correct path
		try {
			Thread.sleep(45000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "startEvent"));
//		getRemainingDaysTaskTest();
//		assertTrue(RenewalUtil.checkTaskActive(processEngine().getHistoryService(), processInstance.getId(), "awaitTenantReply"));
//		//awaitTenantReplyTaskTest();
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "getRemainingDays")>1);
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "noticeDecision")>1);
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "sendInitalTenantMessage")>1);
	}

	
	@Test
	@Deployment(resources = { 
		     "processes/renewal-process-example.bpmn"
			})
	public void GracePeriodStaggerGreaterThan21DaysTillExpiration() {
		/*
		 * Get the runtime service
		 * Start the process
		 * Set the initial params
		 */
		RuntimeService runtimeService = processEngine().getRuntimeService();
	
		//Test message cantor 11 to 20 days before deadline
		Date leaseExpirationDate = getRenewalExpirationDate(100);
		List<String> emails = new ArrayList<String>();
		emails.add("lungu77@gmail.com");
		
		Map<String, Object> variables = new HashMap<String, Object>();
		variables.put("leaseExpirationDate", leaseExpirationDate);
		variables.put("leaseExpirationBufferDays", 50);
		variables.put("message", "Do you want to renew your lease?");
		variables.put("renewalConfirmed", false);
		variables.put("tenants", emails);
		variables.put("recipiants", "lungu77@gmail.com");

		ProcessInstance processInstance =
		  runtimeService.startProcessInstanceByKey("leaseRenewal", variables);
		
		//Task tests confirm the workflow is going through correct path
		try {
			Thread.sleep(60000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//		assertTrue(RenewalUtil.checkTaskComplete(processEngine().getHistoryService(), processInstance.getId(), "startEvent"));
//		getRemainingDaysTaskTest();
//		assertTrue(RenewalUtil.checkTaskActive(processEngine().getHistoryService(), processInstance.getId(), "awaitTenantReply"));
//		//awaitTenantReplyTaskTest();
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "getRemainingDays")>1);
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "noticeDecision")>1);
//		assertTrue(RenewalUtil.checkTaskCount(processEngine().getHistoryService(), processInstance.getId(), "sendInitalTenantMessage")>1);
	}

	protected void awaitTenantReplyTaskTest(){
		TaskService taskService = processEngine().getTaskService();
	    Task task = taskService.createTaskQuery().singleResult();
		Map<String, Object> tProcessVariables = taskService.getVariables(task.getId());

		//TODO: Test getting the message from an email system
		//TODO: Test saving the message and associate to property and tenant
		
		boolean tenantReplied = (Boolean) tProcessVariables.get("tenantReplied");
		
	    assertFalse("Tenant has NOT replied to message from propety manager", tenantReplied);
		taskService.complete(task.getId());
	}
}
