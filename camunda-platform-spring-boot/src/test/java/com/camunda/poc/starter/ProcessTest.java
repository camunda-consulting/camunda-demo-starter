package com.camunda.poc.starter;

import org.apache.ibatis.logging.LogFactory;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.spring.boot.starter.test.helper.StandaloneInMemoryTestConfiguration;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*;
//import static org.junit.Assert.*;

/**
 * Test case starting an in-memory database-backed Process Engine.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
public class ProcessTest {

  //private static final String PROCESS_DEFINITION_KEY = "spring-boot-starter";
  static {
    LogFactory.useSlf4jLogging(); // MyBatis
  }

  @Rule
  public final ProcessEngineRule processEngine = new StandaloneInMemoryTestConfiguration().rule();

  @Test
  public void testHappyPath() {
    // Either: Drive the process by API and assert correct behavior by camunda-bpm-assert, e.g.:
    //ProcessInstance processInstance = processEngine().getRuntimeService().startProcessInstanceByKey(PROCESS_DEFINITION_KEY);
    
    // Now: Drive the process by API and assert correct behavior by camunda-bpm-assert
  }

}
