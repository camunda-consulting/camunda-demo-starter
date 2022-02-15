package com.camunda.poc.starter.data.oauth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Profile("oauth")
@Entity(name="sf_grant")
public class Grant implements Serializable {

    private @Version
    @JsonIgnore
    Long version;

    public Grant(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public long getId() {
        return id;
    }

    @Column(nullable=true, name="access-token")
    String accessToken;

    @Column(nullable=true, name="instance-url")
    String instanceURL;

    @Column(nullable=true, name="gid")
    String gid;

    @Column(nullable=true, name="token-type")
    String tokenType;

    @Column(nullable=true, name="issued-at")
    @Temporal(TemporalType.DATE)
    Date issuedAt;

    @Column(nullable=true, name="signature")
    String signature;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getInstanceURL() {
        return instanceURL;
    }

    public void setInstanceURL(String instanceURL) {
        this.instanceURL = instanceURL;
    }

    public String getGid() {
        return gid;
    }

    public void setGid(String gid) {
        this.gid = gid;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Date getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Date issuedAt) {
        this.issuedAt = issuedAt;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

}
