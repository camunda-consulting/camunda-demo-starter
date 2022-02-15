package com.camunda.poc.starter.dto;

public class Employee {

    private static final long serialVersionUID = -209114353715280386L;

    private String first;
    private String last;
    private String email;
    private String phone;

    private String type;
    private String addressLocality;
    private String addressRegion;
    private String postalCode;
    private String streetAddress;
    private String manager;

    public Employee(){}

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAddressLocality() {
        return addressLocality;
    }

    public void setAddressLocality(String addressLocality) {
        this.addressLocality = addressLocality;
    }

    public String getAddressRegion() {
        return addressRegion;
    }

    public void setAddressRegion(String addressRegion) {
        this.addressRegion = addressRegion;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
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
