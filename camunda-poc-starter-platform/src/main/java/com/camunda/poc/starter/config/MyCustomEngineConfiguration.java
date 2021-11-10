package com.camunda.poc.starter.config;


import org.camunda.bpm.engine.impl.plugin.AdministratorAuthorizationPlugin;
import org.camunda.bpm.engine.spring.SpringProcessEngineConfiguration;
import org.camunda.bpm.identity.impl.ldap.plugin.LdapIdentityProviderPlugin;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("custom-engine-config")
//@Configuration
public class MyCustomEngineConfiguration {

    @Value("camunda.history.cleanup.historyCleanupBatchSize")
    private Integer historyCleanupBatchSize;

    @Value("camunda.history.cleanup.historyCleanupBatchThreshold")
    private Integer historyCleanupBatchThreshold;

    @Bean
    public SpringProcessEngineConfiguration processEngineConfiguration() {
        SpringProcessEngineConfiguration config = new SpringProcessEngineConfiguration();

//        config.setDataSource(dataSource());
//        config.setTransactionManager(transactionManager());

        config.setDatabaseSchemaUpdate("true");
        config.setHistory("audit");
        config.setJobExecutorActivate(true);

        config.setHistoryCleanupBatchSize(historyCleanupBatchSize);
        config.setHistoryCleanupBatchThreshold(historyCleanupBatchThreshold);
        return config;
    }

}