package com.camunda.poc.starter.poc.submission.repo;

import com.camunda.poc.starter.poc.submission.entity.Contact;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

@Profile("poc")
public interface ContactRepository extends PagingAndSortingRepository<Contact, Long>{

//	@Query("select l from renewal l where l.end <= ?1 and l.renewalStarted = false and l.renewalCompleted = false")
//	public List<Renewal> findByEndDate(Date date);

	Contact findContactByEmail(@Param("email") String email);

}
