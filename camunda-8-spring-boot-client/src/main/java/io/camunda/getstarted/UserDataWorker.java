package io.camunda.getstarted;

import io.camunda.zeebe.client.api.response.ActivatedJob;
import io.camunda.zeebe.client.api.worker.JobClient;
import io.camunda.zeebe.spring.client.EnableZeebeClient;
import io.camunda.zeebe.spring.client.annotation.ZeebeWorker;
import org.apache.http.client.fluent.Request;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@EnableZeebeClient
@Profile("user-data")
public class UserDataWorker {

  private final static Logger LOG = LoggerFactory.getLogger(Class.class.getName());

  @Value("${data.api.uri}")
  String dataApiUri;

  @ZeebeWorker(type = "get-user")
  public void get(final JobClient client, final ActivatedJob job) throws IOException {

    LOG.info("\n\n Get business data from business API");

      final String searchTerm = (String) job.getVariablesAsMap().get("searchTerm");
      final String emailAddress = (String) job.getVariablesAsMap().get("email");

    String dataURI = dataApiUri + "/" + searchTerm + emailAddress;
    LOG.info(" \n\n ====>> Data URI " + dataURI + "\n");

    //Use fluent HTTP api to execute request
    String content = Request.Get(dataURI).execute().returnContent().asString();
    LOG.info(" \n\n ====>> Response Body " + content + "\n");

    final String emailBody = (String) job.getVariablesAsMap().get("message");

    final String user = (String) job.getVariablesAsMap().put("user", content);

    client.newCompleteCommand(job.getKey()).variables("{\"user\": "+content+"}").send()
      // join(); <-- This would block for the result. While this is easier-to-read code, it has limitations for parallel work.
      // Hence, the following code leverages reactive programming. This is discssed in https://blog.bernd-ruecker.com/writing-good-workers-for-camunda-cloud-61d322cad862.
      .whenComplete((result, exception) -> {
        if (exception == null) {
          LOG.info("\n\n Completed job successful with result:" + result);
        } else {
          LOG.error("\n\n Failed to complete job", exception);
        }
      });
  }
}
