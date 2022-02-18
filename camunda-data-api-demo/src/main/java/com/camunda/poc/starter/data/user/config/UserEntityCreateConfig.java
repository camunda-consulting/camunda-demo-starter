package com.camunda.poc.starter.data.user.config;

import com.camunda.poc.starter.data.user.entity.User;
import com.camunda.poc.starter.data.user.repo.UserRepository;
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
import java.util.logging.Logger;

@Profile("user")
@Configuration
public class UserEntityCreateConfig {

    private UserRepository repository;

    @Autowired
    public UserEntityCreateConfig(UserRepository repository){
        this.repository = repository;
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
        metadata.addAnnotatedClass(User.class);

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


        if (repository.count() == 0) {
            LOGGER.info("\n\n **** Create User Post Init Hook ***** \n\n ");

            User user = new User();
            user.setFirst("Paul");
            user.setLast("Lungu");
            user.setEmail("paul.lungu@camunda.com");
            user.setManager("Victor");
            user.setCity("Lafayette");
            user.setCountry("USA");
            user.setState("Colorado");
            user.setStreet("1234 Atlantis Ave");
            repository.save(user);

            LOGGER.info("\n\n **** User Created ****** \n\n");
        }
    }

} //END CLASS
