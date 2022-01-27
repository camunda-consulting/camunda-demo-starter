package com.camunda.poc.starter.poc.kase.config;

import com.camunda.poc.starter.poc.kase.entity.Case;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Profile("poc-es")
@Configuration
public class KaseRepositoryConfig implements RepositoryRestConfigurer {

  @Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Case.class);
  }

}
