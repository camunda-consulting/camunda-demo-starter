package com.camunda.poc.starter.data.oauth.config;

import com.camunda.poc.starter.data.kase.entity.Case;
import com.camunda.poc.starter.data.kase.repo.KaseRepository;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.tool.hbm2ddl.SchemaExport;
import org.hibernate.tool.schema.TargetType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import java.sql.SQLException;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

@Profile("oauth")
@Configuration
public class CacheEntityCreateConfig {

    private KaseRepository caseRepository;

    @Autowired
    public CacheEntityCreateConfig(KaseRepository caseRepository){
        this.caseRepository = caseRepository;
    }

    private final Logger LOGGER = Logger.getLogger(Class.class.getName());

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String userName;

    @Value("${spring.datasource.password}")
    private String password;

    /**
     *
     * @param event
     * @throws SQLException
     */
    @EventListener
    @org.springframework.core.annotation.Order(10)
    public void onApplicationEvent(ContextRefreshedEvent event) throws SQLException {

        LOGGER.info("\n\n ********************** post app hook *********************** \n\n ");

        Map<String, String> settings = new HashMap<>();
        settings.put("hibernate.connection.url", url);
        settings.put("hibernate.connection.username", userName);
        settings.put("hibernate.connection.password", password);
        settings.put("hibernate.show_sql", "true");
        settings.put("hibernate.format_sql", "true");

        ServiceRegistry serviceRegistry =
                new StandardServiceRegistryBuilder()
                        .applySettings(settings).build();

        MetadataSources metadata = new MetadataSources(serviceRegistry);
        metadata.addAnnotatedClass(Case.class);

        EnumSet<TargetType> enumSet = EnumSet.of(TargetType.DATABASE);

        SchemaExport export = new SchemaExport()
                .setDelimiter(";")
                .setFormat(true);

        export.execute(enumSet, SchemaExport.Action.CREATE, metadata.buildMetadata());

        LOGGER.info("\n\n **** Tables Created ****** \n\n");

    }

    /**
     *
     * @param event
     * @throws SQLException
     */
    @EventListener
    @org.springframework.core.annotation.Order(20)
    public void onApplicationEventCreateContact(ContextRefreshedEvent event) throws SQLException {


        if (caseRepository.count() == 0) {

            LOGGER.info("\n\n ********************** Create Case Post Init Hook *********************** \n\n ");

            Case kase = new Case();
            kase.setStatus("hold");
            kase.setKey(UUID.randomUUID().toString());
            caseRepository.save(kase);

            Case kase2 = new Case();
            kase2.setStatus("clear");
            kase2.setKey(UUID.randomUUID().toString());
            caseRepository.save(kase2);

            LOGGER.info("\n\n **** Case Created ****** \n\n");
        }
    }

} //END CLASS
