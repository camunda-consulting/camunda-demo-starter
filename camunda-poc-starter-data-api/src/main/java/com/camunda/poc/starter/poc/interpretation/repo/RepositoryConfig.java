package com.camunda.poc.starter.poc.interpretation.repo;

import com.camunda.poc.starter.entity.workflow.Status;
import com.camunda.poc.starter.entity.workflow.User;
import com.camunda.poc.starter.poc.interpretation.entity.Interpretation;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Profile("poc-es")
@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {

  @Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Interpretation.class, User.class, Status.class);
  }

}
