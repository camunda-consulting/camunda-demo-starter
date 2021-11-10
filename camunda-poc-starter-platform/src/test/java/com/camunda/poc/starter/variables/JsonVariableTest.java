package com.camunda.poc.starter.variables;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.logging.LogFactory;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.test.Deployment;
import org.camunda.bpm.engine.variable.Variables;
import org.camunda.bpm.engine.variable.value.ObjectValue;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.camunda.bpm.engine.test.assertions.bpmn.AbstractAssertions.init;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class JsonVariableTest {

  //private static final String PROCESS_DEFINITION_KEY = "spring-boot-starter";

  @Autowired
  private ProcessEngine processEngine;

  static {
    LogFactory.useSlf4jLogging(); // MyBatis
  }

  @Before
  public void setup() {
    init(processEngine);
  }

  @Test
  @Deployment(resources = { "variable-example.bpmn" })
  public void testJsonSerialization() throws Exception{
    
    ObjectValue variable = Variables
        .serializedObjectValue("{\"type\": \"PostalAddress\",\"addressLocality\": \"Denver\",\"addressRegion\": \"CO\",\"postalCode\": \"80209\",\"streetAddress\": \"7 S. Broadway\"}")
        .objectTypeName("java.lang.Object")
        .serializationDataFormat(Variables.SerializationDataFormats.JSON)
        .create();
    
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("address", variable);

    RuntimeService runtimeService = processEngine.getRuntimeService();
    runtimeService.startProcessInstanceByKey("process-variables-example", map);
  }
}
