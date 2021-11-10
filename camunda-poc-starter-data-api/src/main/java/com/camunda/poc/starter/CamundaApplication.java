package com.camunda.poc.starter;

//import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication()
//@EnableAdminServer
public class CamundaApplication {

	public static void main(String... args) {
	    SpringApplication.run(CamundaApplication.class, args);
	}

}