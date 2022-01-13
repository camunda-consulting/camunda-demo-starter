package com.camunda.poc.starter.repo.camunda;


import com.camunda.poc.starter.entity.data.CamundaTask;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;

@Profile("camunda-custom-entities")
public interface CamundaTaskRepository extends PagingAndSortingRepository<CamundaTask, Long>{}
