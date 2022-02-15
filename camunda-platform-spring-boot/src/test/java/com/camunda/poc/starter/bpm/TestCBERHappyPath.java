package com.camunda.poc.starter.bpm;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.runtime.Job;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.runtime.ProcessInstanceQuery;
import org.camunda.bpm.engine.runtime.ProcessInstanceWithVariables;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.engine.task.TaskQuery;
import org.camunda.bpm.engine.test.Deployment;
import org.camunda.bpm.engine.test.ProcessEngineRule;
import org.camunda.bpm.engine.test.mock.Mocks;
import org.camunda.bpm.extension.process_test_coverage.junit.rules.TestCoverageProcessEngineRuleBuilder;
import org.camunda.bpm.model.bpmn.instance.Gateway;
import org.junit.*;

import static org.camunda.bpm.engine.test.assertions.ProcessEngineTests.*;
import static org.camunda.bpm.engine.test.assertions.bpmn.BpmnAwareTests.complete;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.camunda.bpm.engine.RuntimeService;
import org.mockito.Mock;

import javax.inject.Inject;
import javax.inject.Named;


@Deployment(resources = {"processes/bla-original-submission-review-process-bpmn.bpmn", "processes/review-office-supervisor-decision.dmn"})
public class TestCBERHappyPath {
    @Mock
    private LoggerMock loggerMock;

    @Before
    public void setup() {
        // register a bean name with mock expression manager
        LoggerMock lm = new LoggerMock();
        Mocks.register("logger", lm);
    }

    @After
    public void teardown() {
        Mocks.reset();
    }

    @Named
    public class LoggerMock implements JavaDelegate {

        @Inject
        private LoggerMock loggerMock;

        public void execute(DelegateExecution execution) throws Exception {
            System.out.println("hello!");
        }
    }

    protected static final String PROCESS_DEFINITION_KEY = "Process_CBER";

    @Rule
    @ClassRule
    //public ProcessEngineRule processEngineRule = new ProcessEngineRule();
    public static final ProcessEngineRule processEngineRule = TestCoverageProcessEngineRuleBuilder.create().build();

    @Test
    public void happyPath(){

        /*
         * Get the runtime service
         * Start the process
         * Set the initial params
         */
        RuntimeService runtimeService = processEngine().getRuntimeService();

        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("establishedName", "blood");
        variables.put("priority", "high");
        variables.put("indication", "");
        variables.put("dosageForm", "");
        variables.put("candidateGroup", "group");

        ProcessInstance processInstance =
                runtimeService.startProcessInstanceByKey(PROCESS_DEFINITION_KEY, variables);

        assertThat(processInstance).isActive();

        assertThat(processInstance).isWaitingAt("Activity_1f0o2h8");
        complete(task(), withVariables("actions", "something"));

        assertThat(processInstance).isWaitingAt("Gateway_09oltnv");
        execute(job());

        assertThat(processInstance).isWaitingAt("Activity_02hy6hb");
        complete(task(), withVariables("actions", "something"));

        assertThat(processInstance).isWaitingAt("Activity_04c9xui");
        ProcessInstance subProcess = processInstanceQuery().processDefinitionKey("Process_assign-disipline-reviewers").singleResult();
        assertThat(subProcess).isWaitingAt("Activity_0eoaneb");
        complete(task());
        assertThat(subProcess).isWaitingAt("Activity_1au214s");
        complete(task());

        List<Job> jobList = jobQuery().list();
        for (Job job : jobList) {
            execute(job);
        }

        List<Task> tasks = taskQuery().list();
        for (Task task : tasks) {
            taskService().complete(task.getId());
        }
        assertThat(processInstance).isWaitingAt("Activity_1um33s0");
        complete(task());

        assertThat(processInstance).isWaitingAt("Activity_1ejhpxa");
        complete(task());

        subProcess = processInstanceQuery().processDefinitionKey("Process_conduct-discipline-review").singleResult();
        assertThat(subProcess).isWaitingAt("Activity_1o0h6zy");
        complete(task(), withVariables("status", "complete"));

        assertThat(subProcess).isWaitingAt("Activity_1qgzqy4");
        complete(task());

        assertThat(processInstance).isEnded();

    }

}
