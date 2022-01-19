package com.camunda.poc.starter.poc.reading.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name="poc_reading")
@Getter
@Setter
public class Reading {

    private static final long serialVersionUID = -209114346985280386L;

    public Reading(){}

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

    @Column(name="reading_time", nullable=true)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    Date readingTime;

    @Column(nullable=true)
    String systolic;

    @Column(nullable=true)
    String diastolic;



}
