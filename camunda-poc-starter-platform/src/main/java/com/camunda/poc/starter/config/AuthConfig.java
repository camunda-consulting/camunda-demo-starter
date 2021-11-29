package com.camunda.poc.starter.config;

import org.camunda.bpm.engine.AuthorizationService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.identity.Group;
import org.camunda.bpm.engine.identity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import java.sql.SQLException;
import java.util.logging.Logger;

@Profile("auth")
@Configuration
public class AuthConfig {

    private AuthorizationService authorizationService;
    private IdentityService identityService;

    @Autowired
    public AuthConfig(AuthorizationService authorizationService,
                      IdentityService identityService){
        this.authorizationService = authorizationService;
        this.identityService = identityService;
    }

    private final Logger LOGGER = Logger.getLogger(Class.class.getName());

    /**
     *
     * @param event
     * @throws SQLException
     */
    @EventListener
    @org.springframework.core.annotation.Order(100)
    public void onApplicationEventCreateUsers(ContextRefreshedEvent event) throws SQLException {
        LOGGER.info("\n\n ********************** Create Camunda Users *********************** \n\n ");

//        Group rpmGroup = identityService.newGroup("rpm");
//        identityService.saveGroup(rpmGroup);

        User user = null;

        user = identityService.createUserQuery().userId("rpm1").singleResult();
        if (user == null) {
            User uzr = identityService.newUser("rpm1");
            uzr.setPassword("demo");
            uzr.setFirstName("Joan");
            identityService.saveUser(uzr);
        }

        user = identityService.createUserQuery().userId("rpm2").singleResult();
        if (user == null) {
            User uzr = identityService.newUser("rpm2");
            uzr.setPassword("demo");
            uzr.setFirstName("Jim");
            identityService.saveUser(uzr);
        }

        user = identityService.createUserQuery().userId("reviewer1").singleResult();
        if (user == null) {
            User uzr = identityService.newUser("reviewer1");
            uzr.setPassword("demo");
            uzr.setFirstName("Jack");
            identityService.saveUser(uzr);
        }

        user = identityService.createUserQuery().userId("reviewer2").singleResult();
        if (user == null) {
            User uzr = identityService.newUser("reviewer2");
            uzr.setPassword("demo");
            uzr.setFirstName("Jane");
            identityService.saveUser(uzr);
        }

        user = identityService.createUserQuery().userId("reviewer3").singleResult();
        if (user == null) {
            User uzr = identityService.newUser("reviewer3");
            uzr.setPassword("demo");
            uzr.setFirstName("June");
            identityService.saveUser(uzr);
        }

        user = identityService.createUserQuery().userId("cmcSubpervisor").singleResult();
        if (user == null) {
            User uzr = identityService.newUser("cmcSubpervisor");
            uzr.setPassword("demo");
            uzr.setFirstName("Donny");
            identityService.saveUser(uzr);
        }

        user = identityService.createUserQuery().userId("qcbqSubpervisor").singleResult();
        if (user == null) {
            User uzr = identityService.newUser("qcbqSubpervisor");
            uzr.setPassword("demo");
            uzr.setFirstName("Mary");
            identityService.saveUser(uzr);
        }

        user = identityService.createUserQuery().userId("ragnar").singleResult();
        if (user == null) {
            User uzr = identityService.newUser("ragnar");
            uzr.setPassword("demo");
            uzr.setFirstName("Rags");
            identityService.saveUser(uzr);
        }

    }


} //END CLASS
