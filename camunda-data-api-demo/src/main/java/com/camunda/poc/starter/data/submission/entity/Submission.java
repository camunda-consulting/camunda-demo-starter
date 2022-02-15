package com.camunda.poc.starter.data.submission.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;
import java.util.Date;

@Profile("poc-submission")
@Entity(name="poc_submission")
@Getter
@Setter
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

    @Column(name="creation_date", nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    //====================================================

    @Column(name="review_schedule", nullable=true)
    private String reviewSchedule;

    @Column(name="product", nullable=true)
    private String product;

    @Column(name="product_type", nullable=true)
    private String productType;

    @Column(name="review_office", nullable=true)
    private String reviewOffice;

    @Column(name="conduct_advisory_meeting", nullable=true)
    private Boolean conductAdvisoryMeeting;

    @Column(name="submission_status", nullable=true)
    private String submissionStatus;

    @Column(name="submission_status_date", nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date submissionStatusDate;

    @Column(name="submission_receive_date", nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Date submissionReceiveDate;

    @Column(name="indication", nullable=true)
    private String indication;

    @Column(name="established_name", nullable=true)
    private String establishedName;

    @Column(name="dosage_form", nullable=true)
    private String dosageForm;

    @Column(name="amendment_type", nullable=true)
    private String amendmentType;


}
