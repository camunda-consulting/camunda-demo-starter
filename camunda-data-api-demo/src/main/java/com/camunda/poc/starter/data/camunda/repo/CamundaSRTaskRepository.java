package com.camunda.poc.starter.data.camunda.repo;


import com.camunda.poc.starter.data.camunda.entity.CamundaServiceRequestTask;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;

@Profile("camunda-custom-entities")
public interface CamundaSRTaskRepository extends PagingAndSortingRepository<CamundaServiceRequestTask, Long>{

}
