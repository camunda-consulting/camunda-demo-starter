package com.camunda.poc.starter.reactive.repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Profile("camunda-custom-entities")
@Repository
public class ReactiveServiceRequestRepositoryImpl implements ReactiveServiceRequestRepository{

//	@Autowired
//    ServiceRequestRepository serviceRequestRepository;
//
//	public Flux<ServiceRequestEntity> findServiceRequestEntitiesByApprovedAndStarted(Boolean approved, Boolean started){
//		List<ServiceRequestEntity> sres = serviceRequestRepository
//				.findServiceRequestEntitiesByApprovedAndStarted(approved, started);
//		return Flux.fromIterable(sres);
//	}
//
//	public Flux<ServiceRequestEntity> findServiceRequestEntitiesByRejectedAndStarted(Boolean approved, Boolean started){
//		List<ServiceRequestEntity> sres = serviceRequestRepository
//				.findServiceRequestEntitiesByRejectedAndStarted(approved, started);
//		return Flux.fromIterable(sres);
//	}
//
//	public Mono<ServiceRequestEntity> findServiceRequestByServiceId(String serviceId){
//		ServiceRequestEntity sre = serviceRequestRepository.findServiceRequestByServiceId(serviceId);
//		return Mono.just(sre);
//	}

}
