package com.camunda.poc.starter.data.camunda.repo;


import com.camunda.poc.starter.data.camunda.entity.CamundaTask;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;

@Profile("camunda-custom-entities")
public interface CamundaTaskRepository extends PagingAndSortingRepository<CamundaTask, Long>{}
