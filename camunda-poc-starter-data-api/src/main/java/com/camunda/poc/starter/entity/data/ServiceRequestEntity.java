package com.camunda.poc.starter.entity.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;

@Profile("camunda-custom-entities")
@Entity(name="service_request")
public class ServiceRequestEntity {

    private static final long serialVersionUID = -209110232715280386L;

    private @Version
    @JsonIgnore
    Long version;

    public ServiceRequestEntity(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public long getId() {
        return id;
    }

    @Column(name="service_id", nullable=false)
    private String serviceId;
    @Column(name="service_category", nullable=true)
    private String serviceCategory;
    @Column(name="service_description", nullable=true)
    private String serviceDescription;
    @Column(name="service_owner", nullable=true)
    private String serviceOwner;
    @Column(name="service_owner_msid", nullable=true)
    private String serviceOwnerMSID;
    @Column(name="sourcing_manager", nullable=true)
    private String sourcingManager;
    @Column(name="sourcing_manager_msid", nullable=true)
    private String sourcingManagerMSID;
    @Column(name="acquiring_division", nullable=true)
    private String acquiringDivision;
    @Column(name="bu_contracting_service", nullable=true)
    private String buContractingService;
    @Column(name="le_contracting_service_code", nullable=true)
    private String leContractingServiceCode;
    @Column(name="additional_reviewer", nullable=true)
    private String additionalReviewer;
    @Column(name="additional_reviewer_msid", nullable=true)
    private String additionalReviewerMSID;
    @Column(name="additional_reviewer_notes", nullable=true)
    private String additionalReviewerNotes;
    @Column(name="sourcing_comments", nullable=true)
    private String sourcingComments;
    @Column(name="application_name", nullable=true)
    private String applicationName;
    @Column(name="eon_id", nullable=true)
    private Integer eonId;
    @Column(name="estimated_annual_spend", nullable=true)
    private String estimatedAnnualSpend;
    @Column(name="service_details_comments", nullable=true)
    private String serviceDetailsComments;
    @Column(name="started", nullable=true)
    private boolean started;
    @Column(name="approved", nullable=true)
    private boolean approved;
    @Column(name="rejected", nullable=true)
    private boolean rejected;

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public boolean getStarted() {
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

    public String getServiceCategory() {
        return serviceCategory;
    }

    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public String getServiceDescription() {
        return serviceDescription;
    }

    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
    }

    public String getServiceOwner() {
        return serviceOwner;
    }

    public void setServiceOwner(String serviceOwner) {
        this.serviceOwner = serviceOwner;
    }

    public String getServiceOwnerMSID() {
        return serviceOwnerMSID;
    }

    public void setServiceOwnerMSID(String serviceOwnerMSID) {
        this.serviceOwnerMSID = serviceOwnerMSID;
    }

    public String getSourcingManager() {
        return sourcingManager;
    }

    public void setSourcingManager(String sourcingManager) {
        this.sourcingManager = sourcingManager;
    }

    public String getSourcingManagerMSID() {
        return sourcingManagerMSID;
    }

    public void setSourcingManagerMSID(String sourcingManagerMSID) {
        this.sourcingManagerMSID = sourcingManagerMSID;
    }

    public String getAcquiringDivision() {
        return acquiringDivision;
    }

    public void setAcquiringDivision(String acquiringDivision) {
        this.acquiringDivision = acquiringDivision;
    }

    public String getBuContractingService() {
        return buContractingService;
    }

    public void setBuContractingService(String buContractingService) {
        this.buContractingService = buContractingService;
    }

    public String getLeContractingServiceCode() {
        return leContractingServiceCode;
    }

    public void setLeContractingServiceCode(String leContractingServiceCode) {
        this.leContractingServiceCode = leContractingServiceCode;
    }

    public String getAdditionalReviewer() {
        return additionalReviewer;
    }

    public void setAdditionalReviewer(String additionalReviewer) {
        this.additionalReviewer = additionalReviewer;
    }

    public String getAdditionalReviewerMSID() {
        return additionalReviewerMSID;
    }

    public void setAdditionalReviewerMSID(String additionalReviewerMSID) {
        this.additionalReviewerMSID = additionalReviewerMSID;
    }

    public String getAdditionalReviewerNotes() {
        return additionalReviewerNotes;
    }

    public void setAdditionalReviewerNotes(String additionalReviewerNotes) {
        this.additionalReviewerNotes = additionalReviewerNotes;
    }

    public String getSourcingComments() {
        return sourcingComments;
    }

    public void setSourcingComments(String sourcingComments) {
        this.sourcingComments = sourcingComments;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public Integer getEonId() {
        return eonId;
    }

    public void setEonId(Integer eonId) {
        this.eonId = eonId;
    }

    public String getEstimatedAnnualSpend() {
        return estimatedAnnualSpend;
    }

    public void setEstimatedAnnualSpend(String estimatedAnnualSpend) {
        this.estimatedAnnualSpend = estimatedAnnualSpend;
    }

    public String getServiceDetailsComments() {
        return serviceDetailsComments;
    }

    public void setServiceDetailsComments(String serviceDetailsComments) {
        this.serviceDetailsComments = serviceDetailsComments;
    }
}
