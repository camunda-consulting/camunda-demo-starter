package com.camunda.poc.starter.integration.email;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Profile("email")
@Component("bccEmailDelegate")
public class BccEmailDelegate implements JavaDelegate {

    private final Logger LOGGER = Logger.getLogger(BccEmailDelegate.class.getName());

    private EmailService emailService;

    @Autowired
    public BccEmailDelegate(EmailService emailService) {
        this.emailService = emailService;
    }

    public BccEmailDelegate() {
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {

        String emailTo = (String) execution.getVariable("emailTo");
        String emailSubject = (String) execution.getVariable("subject");
        String emailBody = (String) execution.getVariable("emailBody");
        String emailFrom = (String) execution.getVariable("emailFrom");
        String emailBcc = (String) execution.getVariable("emailBcc");

        emailService.sendBccMessage(emailTo, emailFrom, emailBcc, emailSubject, emailBody);

        execution.setVariable("mailSendStatus", "success");
    }
}
