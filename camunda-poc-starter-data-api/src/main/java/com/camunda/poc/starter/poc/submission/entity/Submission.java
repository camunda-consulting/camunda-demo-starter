package com.camunda.poc.starter.poc.submission.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;
import java.util.Date;

@Profile("poc")
@Entity(name="poc_submission")
public class Submission {

    private static final long serialVersionUID = -209110232715280386L;

    private @Version
    @JsonIgnore
    Long version;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public long getId() {
        return id;
    }

    @Column(name="submission_date", nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date submissionDate;

    @Column(name="business_key", nullable=true)
    private String businessKey;

    @Column(name="started", nullable=true)
    private boolean started;

    @Column(name="approved", nullable=true)
    private boolean approved;

    @Column(name="rejected", nullable=true)
    private boolean rejected;

    @Column(name="status", nullable=true)
    private String status;

    @Column(name="email", nullable=true)
    private String email;

    @Column(name="submission_type", nullable=true)
    private String submissionType;

    @Column(name="location", nullable=true)
    private String location;

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getBusinessKey() {
        return businessKey;
    }

    public void setBusinessKey(String businessKey) {
        this.businessKey = businessKey;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isStarted() {
        return started;
    }

    public void setStarted(boolean started) {
        this.started = started;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public boolean isRejected() {
        return rejected;
    }

    public void setRejected(boolean rejected) {
        this.rejected = rejected;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSubmissionType() {
        return submissionType;
    }

    public void setSubmissionType(String submissionType) {
        this.submissionType = submissionType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
