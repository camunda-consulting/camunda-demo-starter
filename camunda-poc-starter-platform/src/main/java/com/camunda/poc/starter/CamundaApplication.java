package com.camunda.poc.starter;

import com.camunda.poc.starter.usecase.renewal.AppConfigProperties;
//import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.camunda.bpm.spring.boot.starter.annotation.EnableProcessApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages={"com.camunda.poc.starter","com.camunda.poc.starter.usecase.renewal"})
@EnableProcessApplication("spring-boot-starter")
@EnableConfigurationProperties(AppConfigProperties.class)
//@EnableAdminServer
public class CamundaApplication {

	public static void main(String... args) {
	    SpringApplication.run(CamundaApplication.class, args);
	}

}