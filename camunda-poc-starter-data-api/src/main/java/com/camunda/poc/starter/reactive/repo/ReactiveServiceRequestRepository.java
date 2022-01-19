package com.camunda.poc.starter.reactive.repo;

import org.springframework.context.annotation.Profile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Profile("reactive")
public interface ReactiveServiceRequestRepository {

//	Flux<ServiceRequestEntity> findServiceRequestEntitiesByApprovedAndStarted(Boolean approved, Boolean started);
//
//	Flux<ServiceRequestEntity> findServiceRequestEntitiesByRejectedAndStarted(Boolean rejected, Boolean started);
//
//	Mono<ServiceRequestEntity> findServiceRequestByServiceId(String serviceId);

}