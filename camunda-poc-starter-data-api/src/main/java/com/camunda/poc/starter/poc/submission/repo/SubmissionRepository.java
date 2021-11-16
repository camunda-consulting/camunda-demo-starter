package com.camunda.poc.starter.poc.submission.repo;

import com.camunda.poc.starter.poc.submission.entity.Submission;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Profile("poc")
public interface SubmissionRepository extends PagingAndSortingRepository<Submission, Long>{

	Submission findSubmissionByBusinessKey(@Param("businessKey") String businessKey);

	List<Submission> findSubmissionByStarted(@Param("started") Boolean started);

}
