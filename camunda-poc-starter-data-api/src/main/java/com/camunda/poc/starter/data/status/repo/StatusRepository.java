package com.camunda.poc.starter.data.status.repo;

import com.camunda.poc.starter.data.status.entity.Status;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

@Profile("poc-status")
public interface StatusRepository extends PagingAndSortingRepository<Status, Long>{

	Status findStatusByKey(@Param("key") String key);

}
