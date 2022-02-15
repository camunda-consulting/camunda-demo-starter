package com.camunda.poc.starter.data.kase.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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
    @Column(nullable=true)
    Integer systolic;
    @Column(nullable=true)
    Integer diastolic;
    @Column(nullable=true)
    Integer bmi;
    @Column(nullable=true)
    Integer ldl;
    @Column(nullable=true)
    Integer hdl;
    @Column(nullable=true)
    Integer sodium;

    @Column(name="hgb_a1c", nullable=true)
    String hgbA1C;

    @Column(name="ecg_ekg", nullable=true)
    String ecgEkg;

    @Column(nullable=true)
    String smoker;


}
