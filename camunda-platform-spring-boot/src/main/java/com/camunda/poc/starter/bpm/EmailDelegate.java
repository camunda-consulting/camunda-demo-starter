package com.camunda.poc.starter.bpm;

import com.camunda.poc.starter.integration.email.EmailService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Profile("email")
@Component("emailDelegate")
public class EmailDelegate implements JavaDelegate {

    private final Logger LOGGER = Logger.getLogger(LoggerDelegate.class.getName());

    private EmailService emailService;

    //get the dynamic object to be updated
    private Expression subject;

    //get the value of the type of object to submit
    private Expression message;

    //Use Camunda field injection to get the value from the workflow config
    private Expression email;

    @Autowired
    public EmailDelegate(EmailService emailService){
        this.emailService = emailService;
    }

    @Override
    public void execute(DelegateExecution execution) throws Exception {

        String emailSubject = (String) subject.getValue(execution).toString();
        String emailBody = (String) message.getValue(execution).toString();
        String emailTo = (String) email.getValue(execution).toString();

        emailService.sendSimpleMessage(emailTo, emailSubject, emailBody);

        execution.setVariable("mailSendStatus", "success");
    }
}
