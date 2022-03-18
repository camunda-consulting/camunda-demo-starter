package com.camunda.poc.starter.reactive;

import com.camunda.poc.starter.data.kase.entity.Case;
import com.camunda.poc.starter.data.kase.repo.KaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Profile("reactive")
@Repository
public class ReactiveRepositoryImpl implements ReactiveRepository {

	private KaseRepository repository;

	public ReactiveRepositoryImpl(){}

	@Autowired
	public ReactiveRepositoryImpl(KaseRepository repository){
		this.repository = repository;
	}

	public Mono<Case> findByKey(String key){
		Case status = repository.findCaseByKey(key);
		return Mono.just(status);
	}

	@Override
	public Flux<Case> getAll() {
		return (Flux<Case>) repository.findAll();
	}
}
