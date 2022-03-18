package com.camunda.poc.starter.reactive;

import com.camunda.poc.starter.data.kase.entity.Case;
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
    ReactiveRepository repository;

    @GetMapping("/cases/{id}")
    public Mono<Case> getPolicy(@PathVariable String id)  {

        return (Mono<Case>) repository.findByKey(id);
    }

    @GetMapping("/servicerequest/started")
    public Flux<Case> getAll()  {
        return (Flux<Case>) repository.getAll();
    }

}
