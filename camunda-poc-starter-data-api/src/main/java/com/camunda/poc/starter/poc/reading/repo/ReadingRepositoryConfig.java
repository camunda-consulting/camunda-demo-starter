package com.camunda.poc.starter.poc.reading.repo;

import com.camunda.poc.starter.poc.reading.entity.Reading;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Profile("poc-es")
@Configuration
public class ReadingRepositoryConfig implements RepositoryRestConfigurer {

  @Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Reading.class);
  }

}
