package com.camunda.poc.starter.data.camunda.entity;

import org.springframework.context.annotation.Profile;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Profile("camunda-custom-entities")
@Entity
@Table(name="act_ru_task")
public class CamundaTask {

	public CamundaTask(){};
	public CamundaTask(String taskId){ }
	
    @Id
    @Column(nullable=false, name="ID_")
    private String id;

    @Column(nullable=false, name="NAME_")
    String name;

    public String getId(){
    	return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
