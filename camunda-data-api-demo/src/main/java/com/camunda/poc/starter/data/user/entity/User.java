package com.camunda.poc.starter.data.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;

@Profile("user")
@Entity(name="poc_user")
@Getter
@Setter
public class User {

    private static final long serialVersionUID = -209114353715280555L;

    private @Version
    @JsonIgnore
    Long version;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable=true)
    private String first;
    @Column(nullable=true)
    private String last;
    @Column(nullable=true)
    private String email;
    @Column(nullable=true)
    private String phone;

    @Column(nullable=true)
    private String street;
    @Column(nullable=true)
    private String city;
    @Column(nullable=true)
    private String state;
    @Column(nullable=true)
    private String zip;
    @Column(nullable=true)
    private String country;

    @Column(nullable=true)
    private String manager;

    @Column(nullable=true)
    private String groups;

    public Boolean hasEmail() {
        if(email.isEmpty() || !email.contains("@")) {
            return false;
        }else{
            return true;
        }
    }

}
