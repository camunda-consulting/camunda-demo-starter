package com.camunda.poc.starter.poc.reading.repo;

import com.camunda.poc.starter.poc.reading.entity.Reading;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;

@Profile("poc-es")
public interface ReadingRepository extends PagingAndSortingRepository<Reading, Long>{

//	@Query("select l from renewal l where l.end <= ?1 and l.renewalStarted = false and l.renewalCompleted = false")
//	public List<Renewal> findByEndDate(Date date);
//
//	@Query("select l from renewal l where l.renewalStarted = true and l.renewalCompleted = false ORDER BY l.showDate DESC")
//	public List<Renewal> findStarted();
//
//	List<ServiceRequestEntity> findServiceRequestEntitiesByApprovedAndStarted(
//            @Param("approved") Boolean approved, @Param("started") Boolean started);
//
//	List<ServiceRequestEntity> findServiceRequestEntitiesByRejectedAndStarted(
//            @Param("rejected") Boolean rejected, @Param("started") Boolean started);
//
//	ServiceRequestEntity findServiceRequestByServiceId(@Param("serviceId") String serviceId);

}
