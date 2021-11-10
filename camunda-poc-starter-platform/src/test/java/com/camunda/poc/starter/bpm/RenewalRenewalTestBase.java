package com.camunda.poc.starter.bpm;

import static org.junit.Assert.assertTrue;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.camunda.poc.starter.usecase.renewal.AppConfigProperties;
//import com.camunda.poc.starter.usecase.renewal.RenewalUtil;
import org.apache.ibatis.logging.LogFactory;
import java.util.logging.Logger;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.spring.boot.starter.test.helper.StandaloneInMemoryTestConfiguration;
import org.junit.Rule;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
public class RenewalRenewalTestBase {
  public static Logger log = Logger.getLogger(RenewalRenewalTestBase.class.getName());

  protected static final String PROCESS_DEFINITION_KEY = "lease-renewal";

  @Rule
  public final ProcessEngineRule processEngine = new StandaloneInMemoryTestConfiguration().rule();

	  static {
	    LogFactory.useSlf4jLogging(); // MyBatis
	  }
	  
	protected void getRemainingDaysTaskTest(){
		TaskService taskService = processEngine().getTaskService();
	    Task task = taskService.createTaskQuery().singleResult();
		Map<String, Object> tProcessVariables = taskService.getVariables(task.getId());

	    int remainingDays = ((Integer)tProcessVariables.get("remainingDays"));
	    
	    assertTrue("Remaining Days until lease expires is less than 0", remainingDays > 0);
	}
	
	protected void awaitTenantReplyTaskTest(String tenant){
		TaskService taskService = processEngine().getTaskService();

//    	List<Task> tasks = RenewalUtil.queryTasksByCandidate(taskService, tenant);
//    	if (tasks.isEmpty()){
//    		//TODO: send message to property manager tenant sent a message but has no tasks.
//	    	log.fine("[X] No tasks found for :"+tenant);
//    	}
//		Task task = tasks.get(0);
//		log.fine("Completing Task: "+task.getName());
//		Map<String, Object> variables = new HashMap<String, Object>();
//		variables.put("message", "Yes I would like to renew my lease.");
//		taskService.complete(task.getId(), variables);

	}
	
	protected void confrimRenewalStateTaskTest(){
		TaskService taskService = processEngine().getTaskService();
	    Task task = taskService.createTaskQuery().singleResult();

		//TODO: Test getting the message from an email system
		//TODO: Test saving the message and associate to property and tenant
		
		Map<String, Object> variables = new HashMap<String, Object>();

		Map<String, Object> processVariables = taskService.getVariables(task.getId());
		String message = processVariables.get("message").toString();
		assertTrue("Renewal Not Confirmed", 
				message.equalsIgnoreCase("Yes I would like to renew my lease."));
		variables.put("renewalConfirmed", true);
		variables.put("message", "Thanks for confirming the renewal of your lease!");
		//only need to set grace period if default is not sufficient during the final notice loop
		//variables.put("gracePeriod", gracePeriod);
		taskService.complete(task.getId(), variables);
	}
		
	protected Date getRenewalExpirationDate(int days){
		return Date.from(LocalDate.now().plusDays(days).atStartOfDay(ZoneId.systemDefault()).toInstant());
	}
	
	protected List<AppConfigProperties.GracePeriodSetting> getGracePeriodSetting(){
		List<AppConfigProperties.GracePeriodSetting> settings = new ArrayList<AppConfigProperties.GracePeriodSetting>();
		settings.add(new AppConfigProperties.GracePeriodSetting("0/30 * * * * ?", 10));
		settings.add(new AppConfigProperties.GracePeriodSetting("0/40 * * * * ?", 20));
		settings.add(new AppConfigProperties.GracePeriodSetting("0/50 * * * * ?", 30));
		return settings;
	}
		
}
