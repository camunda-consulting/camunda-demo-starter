package com.camunda.poc.starter.data.oauth;

import com.camunda.poc.starter.data.oauth.entity.Grant;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

@Profile("oauth")
public interface GrantRepository extends CrudRepository<Grant, Long> {

    @Cacheable(value = "itemCache")
    public Grant findFirstByIssuedAt(Date day);

}
