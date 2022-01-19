package com.camunda.poc.starter.poc.interpretation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;

@Profile("poc-es")
@Entity(name="poc_interpretation")
@Getter
@Setter
public class Interpretation {

    private static final long serialVersionUID = -209114346985280386L;

    public Interpretation(){}

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

    @Column(name="pathway", nullable=true)
    String pathway;

    @Column(name="status", nullable=true)
    String status;

    @Column(name="reason", nullable=true)
    String reason;

}
