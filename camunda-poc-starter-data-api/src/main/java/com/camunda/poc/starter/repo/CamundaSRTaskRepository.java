package com.camunda.poc.starter.repo;


import com.camunda.poc.starter.entity.data.CamundaServiceRequestTask;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;

@Profile("camunda-custom-entities")
public interface CamundaSRTaskRepository extends PagingAndSortingRepository<CamundaServiceRequestTask, Long>{

}
