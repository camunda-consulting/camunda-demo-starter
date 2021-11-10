package com.camunda.poc.starter.usecase.renewal.email;

import com.sendgrid.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Profile("renewal")
@Service
public class SendGridEmailServiceImpl implements SGEmailService {

//    private SendGrid sendGridClient;
//
//    @Autowired
//    public SendGridEmailServiceImpl(SendGrid sendGridClient) {
//        this.sendGridClient = sendGridClient;
//    }
//
    @Override
    public void sendText(String from, String to, String subject, String body) {
//        Response response = sendEmail(from, to, subject, new Content("text/plain", body));
//        System.out.println("Status Code: " + response.getStatusCode() + ", Body: " + response.getBody() + ", Headers: "
//                + response.getHeaders());
    }

    @Override
    public void sendHTML(String from, String to, String subject, String body) {
//        Response response = sendEmail(from, to, subject, new Content("text/html", body));
//        System.out.println("Status Code: " + response.getStatusCode() + ", Body: " + response.getBody() + ", Headers: "
//                + response.getHeaders());
    }

//    private Response sendEmail(String from, String to, String subject, Content content) {
//        Mail mail = new Mail(new Email(from), subject, new Email(to), content);
//        mail.setReplyTo(new Email("abc@gmail.com"));
//        Request request = new Request();
//        Response response = null;
//        try {
//            request.setMethod(Method.POST);
//            request.setEndpoint("mail/send");
//            request.setBody(mail.build());
//            this.sendGridClient.api(request);
//        } catch (IOException ex) {
//            System.out.println(ex.getMessage());
//        }
//        return response;
//
//    }
}