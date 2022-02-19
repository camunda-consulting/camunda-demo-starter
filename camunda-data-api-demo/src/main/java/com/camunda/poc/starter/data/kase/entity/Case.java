package com.camunda.poc.starter.data.kase.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;

@Profile("case")
@Entity(name="poc_case")
@Getter
@Setter
public class Case {

    private static final long serialVersionUID = -209114346985280386L;

    public Case(){}

    private @Version
    @JsonIgnore
    Long version;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public long getId() {
        return id;
    }

    @Column(nullable=true)
    String key;

    @Column(nullable=true)
    String status;

    @Column(name="active_insurance", nullable=true)
    Boolean activeInsurance;

    @Column(nullable=true)
    Boolean ltoos;

    @Column(name="fillable",nullable=true)
    Boolean fillable;

    @Column(name="pharmacy_name", nullable=true)
    String pharmacyName;

    @Column(name="correct", nullable=true)
    Boolean isCorrect;

    @Column(nullable=true)
    String phone;

    @Column(nullable=true)
    String fax;

    @Column(nullable=true)
    String email;

    @Column(nullable=true)
    String comment;

    @Column(name="member_name", nullable=true)
    String memberName;


}
