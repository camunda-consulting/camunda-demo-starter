package com.camunda.poc.starter.data.user.repo;

import com.camunda.poc.starter.data.user.entity.User;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

@Profile("user")
public interface UserRepository extends PagingAndSortingRepository<User, Long>{

//	@Query("select l from renewal l where l.end <= ?1 and l.renewalStarted = false and l.renewalCompleted = false")
//	public List<Renewal> findByEndDate(Date date);

	User findContactByEmail(@Param("email") String email);

}
