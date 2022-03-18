package com.camunda.poc.starter.reactive;

import com.camunda.poc.starter.data.kase.entity.Case;
import org.springframework.context.annotation.Profile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Profile("reactive")
public interface ReactiveRepository {

	Mono<?> findByKey(String key);

	Flux<?> getAll();
}