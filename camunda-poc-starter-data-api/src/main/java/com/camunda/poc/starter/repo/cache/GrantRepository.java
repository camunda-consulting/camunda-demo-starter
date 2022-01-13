package com.camunda.poc.starter.repo.cache;

import com.camunda.poc.starter.entity.oauth.Grant;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

@Profile("redis-cache")
public interface GrantRepository extends CrudRepository<Grant, Long> {

    @Cacheable(value = "itemCache")
    public Grant findFirstByIssuedAt(Date day);

}
