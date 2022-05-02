package io.camunda.getstarted.service.email;

public interface EmailService {

    public void sendSimpleMessage(String to, String subject, String text);

    public void sendBccMessage(String to, String from, String bcc, String subject, String text);
}
