package com.camunda.poc.starter.reactive;

import com.camunda.poc.starter.data.status.entity.Status;
import com.camunda.poc.starter.data.status.repo.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Profile("reactive")
@Repository
public class ReactiveRepositoryImpl implements ReactiveRepository {

	private StatusRepository repository;

	public ReactiveRepositoryImpl(){}

	@Autowired
	public ReactiveRepositoryImpl(StatusRepository repository){
		this.repository = repository;
	}

	public Mono<Status> findStatusByKey(String key){
		Status status = repository.findStatusByKey(key);
		return Mono.just(status);
	}

}
