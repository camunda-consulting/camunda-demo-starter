package io.camunda.getstarted;

import io.camunda.zeebe.spring.client.EnableZeebeClient;
import io.camunda.zeebe.spring.client.annotation.ZeebeWorker;
import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import io.camunda.getstarted.service.email.*;

@Component
@EnableZeebeClient
@Profile("email")
public class EmailWorker {

  private final static Logger LOG = LoggerFactory.getLogger(EmailWorker.class);

  private EmailService emailService;

  public EmailWorker() {}

  @Autowired
  public EmailWorker(EmailService emailService){
      this.emailService = emailService;
  }

  @ZeebeWorker(type = "email")
  public void send(final JobClient client, final ActivatedJob job) {

    final String emailSubject = (String) job.getVariablesAsMap().get("emailSubject");
    final String emailBody = (String) job.getVariablesAsMap().get("message");
    final String emailTo = (String) job.getVariablesAsMap().get("email");

    LOG.info("Sending email with message content: {}", emailBody);

    emailService.sendSimpleMessage(emailTo, emailSubject, emailBody);

    job.getVariablesAsMap().put("status", "success");

    client.newCompleteCommand(job.getKey()).variables(job.getVariablesAsMap()).send()
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
