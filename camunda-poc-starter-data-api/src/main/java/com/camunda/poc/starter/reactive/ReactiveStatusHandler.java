package com.camunda.poc.starter.reactive;

import com.camunda.poc.starter.entity.data.ServiceRequestEntity;
import com.camunda.poc.starter.repo.ReactiveServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Profile("reactive")
@RestController
@RequestMapping
public class ReactiveStatusHandler {

    @Autowired
    ReactiveServiceRequestRepository repository;

    @GetMapping("/servicerequest/{id}")
    public Mono<ServiceRequestEntity> getPolicy(@PathVariable String id)  {

        return repository.findServiceRequestByServiceId(id);
    }

    @GetMapping("/servicerequest/started")
    public Flux<ServiceRequestEntity> getSerivceRequestStarted()  {
        return repository.findServiceRequestEntitiesByApprovedAndStarted(true, true);
    }

}
