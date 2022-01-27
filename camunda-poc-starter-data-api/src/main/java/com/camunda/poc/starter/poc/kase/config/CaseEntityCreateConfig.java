package com.camunda.poc.starter.poc.kase.config;

import com.camunda.poc.starter.poc.kase.entity.Case;
import com.camunda.poc.starter.poc.kase.repo.KaseRepository;
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

@Profile("poc-es")
@Configuration
public class CaseEntityCreateConfig {

    private KaseRepository caseRepository;

    @Autowired
    public CaseEntityCreateConfig(KaseRepository caseRepository){
        this.caseRepository = caseRepository;
    }

    private final Logger LOGGER = Logger.getLogger(CaseEntityCreateConfig.class.getName());

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

            Case case1 = new Case();
            case1.setStatus("normal");
            case1.setBmi(20);
            case1.setDiastolic(79);
            case1.setEcgEkg("normal");
            case1.setHdl(60);
            case1.setHgbA1C("5.1");
            case1.setLdl(50);
            case1.setSmoker("no");
            case1.setSodium(2400);
            case1.setSystolic(170);
            case1.setKey(UUID.randomUUID().toString());
            caseRepository.save(case1);

            Case case2 = new Case();
            case2.setStatus("normal");
            case2.setBmi(20);
            case2.setDiastolic(79);
            case2.setEcgEkg("normal");
            case2.setHdl(60);
            case2.setHgbA1C("5.1");
            case2.setLdl(50);
            case2.setSmoker("no");
            case2.setSodium(2500);
            case2.setSystolic(115);
            case2.setKey(UUID.randomUUID().toString());
            case2.setKey(UUID.randomUUID().toString());
            caseRepository.save(case2);

            LOGGER.info("\n\n **** Case Created ****** \n\n");
        }
    }

} //END CLASS
