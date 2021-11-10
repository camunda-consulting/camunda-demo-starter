package com.camunda.poc.starter.poc.submission.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;

@Profile("poc")
@Entity(name="poc_contact")
public class Contact {

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

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public Boolean hasEmail() {
        if(email.isEmpty() || !email.contains("@")) {
            return false;
        }else{
            return true;
        }
    }

}
