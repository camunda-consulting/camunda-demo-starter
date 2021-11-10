package com.camunda.poc.starter.reactive;

import com.camunda.poc.starter.poc.submission.entity.Status;
import org.springframework.context.annotation.Profile;
import reactor.core.publisher.Mono;

@Profile("reactive")
public interface ReactiveRepository {

	Mono<Status> findStatusByKey(String key);

}