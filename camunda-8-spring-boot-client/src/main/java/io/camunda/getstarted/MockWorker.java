package io.camunda.getstarted;

import io.camunda.getstarted.service.email.EmailService;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.EnableZeebeClient;
import io.camunda.zeebe.spring.client.annotation.ZeebeWorker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@EnableZeebeClient
@Profile("mock")
public class MockWorker {

  private final static Logger LOG = LoggerFactory.getLogger(MockWorker.class);

  @ZeebeWorker(type = "mock")
  public void send(final JobClient client, final ActivatedJob job) {

    LOG.info("Executing Mock Worker for process: {}", job.getBpmnProcessId());

    client.newCompleteCommand(job.getKey()).send()
      // join(); <-- This would block for the result. While this is easier-to-read code, it has limitations for parallel work.
      // Hence, the following code leverages reactive programming. This is discssed in https://blog.bernd-ruecker.com/writing-good-workers-for-camunda-cloud-61d322cad862.
      .whenComplete((result, exception) -> {
        if (exception == null) {
          LOG.info("Completed job successful with result:" + result);
        } else {
          LOG.error("Failed to complete job", exception);
        }
      });
  }

}
