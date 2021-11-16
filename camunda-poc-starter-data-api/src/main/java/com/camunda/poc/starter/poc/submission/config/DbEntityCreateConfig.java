package com.camunda.poc.starter.poc.submission.config;

import com.camunda.poc.starter.poc.submission.entity.Status;
import com.camunda.poc.starter.poc.submission.entity.User;
import com.camunda.poc.starter.poc.submission.repo.ContactRepository;
import com.camunda.poc.starter.poc.submission.entity.Submission;
import com.camunda.poc.starter.poc.submission.repo.SubmissionRepository;
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
import java.util.*;
import java.util.logging.Logger;

@Profile("poc")
@Configuration
public class DbEntityCreateConfig {

    private ContactRepository contactRepository;
    private SubmissionRepository damageReportRepository;

    @Autowired
    public DbEntityCreateConfig(ContactRepository contactRepository,
                                SubmissionRepository damageReportRepository){
        this.contactRepository = contactRepository;
        this.damageReportRepository = damageReportRepository;
    }

    private final Logger LOGGER = Logger.getLogger(DbEntityCreateConfig.class.getName());

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
    @org.springframework.core.annotation.Order(1)
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
        metadata.addAnnotatedClass(Submission.class);
        metadata.addAnnotatedClass(User.class);
        metadata.addAnnotatedClass(Status.class);


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


        if (contactRepository.count() == 0) {

            LOGGER.info("\n\n ********************** Create Contact Post Init Hook *********************** \n\n ");

            User user = new User();
            user.setCity("Denver");
            user.setCountry("USA");
            user.setEmail("paul.lungu@camunda.com");
            user.setFirst("Paul");
            user.setLast("Lungu");
            user.setManager("Ragner");
            user.setPhone("134-232-2344");
            user.setState("Colorado");
            user.setStreet("Atlantis");
            user.setZip("80026");

            contactRepository.save(user);
            LOGGER.info("\n\n **** Contact Created ****** \n\n");
        }
    }


//    /**
//     *
//     * @param event
//     * @throws SQLException
//     */
//    @EventListener
//    @org.springframework.core.annotation.Order(21)
//    public void onApplicationEventCreateDamageReport(ContextRefreshedEvent event) throws SQLException {
//
//        if (damageReportRepository.count() == 0) {
//
//            for (int i = 0; i < 5; i++) {
//                String uuid = UUID.randomUUID().toString();
//                DamageReport item = new DamageReport();
//                item.setDamageKey(uuid);
//                item.setDamageDate(new Date());
//
//                damageReportRepository.save(item);
//            }
//
//            LOGGER.info("\n\n **** Damage Reports Created ****** \n\n");
//        }
//    }


} //END CLASS
