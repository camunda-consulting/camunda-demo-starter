package com.camunda.poc.starter.repo;

import com.camunda.poc.starter.entity.workflow.Status;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

@Profile("poc")
public interface StatusRepository extends PagingAndSortingRepository<Status, Long>{

	Status findStatusByKey(@Param("key") String key);

}
