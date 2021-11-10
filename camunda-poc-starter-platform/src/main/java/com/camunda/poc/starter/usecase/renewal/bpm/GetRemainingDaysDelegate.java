package com.camunda.poc.starter.usecase.renewal.bpm;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import com.camunda.poc.starter.usecase.renewal.AppConfigProperties.GracePeriodSetting;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Profile("renewal")
@Component("getRemainingDaysDelegate")
public class GetRemainingDaysDelegate implements JavaDelegate {
	public static Logger log = Logger.getLogger(GetRemainingDaysDelegate.class.getName());

	@SuppressWarnings("unchecked")
	public void execute(DelegateExecution execution) {
		
		Date leaseExpirationDate = (Date)execution.getVariable("leaseExpirationDate");
		log.info("The lease expiration date is: "
				+ leaseExpirationDate);
		
		int leaseExpirationBufferDays = (Integer)execution.getVariable("leaseExpirationBufferDays");
		log.info("The buffer number of days for renewal deadline: "
				+ leaseExpirationBufferDays);
		
		//Getting the Renewal Dead line days. 
		//Subtracting the Renewal end date by number of buffer days
		// until final notice is sent so property manger can list property.
		LocalDate expDate = leaseExpirationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		LocalDate renewalDeadlineDate = expDate.minusDays(leaseExpirationBufferDays);
		log.info("The renewal deadline date: "
				+ renewalDeadlineDate);

		int remainingDays = (int)ChronoUnit.DAYS.between(LocalDate.now(), renewalDeadlineDate);
		execution.setVariable("remainingDays", remainingDays);
		log.info("Getting Rmaining Days: "
				+ remainingDays);

		List<GracePeriodSetting> settings = (List<GracePeriodSetting>)execution.getVariable("gracePeriodSettings");
		log.info("Grace Period Settings: "
				+ settings.get(0).toString());

		//set the default grace period  
		//then make the grace period shorter based on the days remaining on the renewal
		execution.setVariable("gracePeriod", settings.get(0).getCron());		
		for(GracePeriodSetting setting : settings){
			if (remainingDays > setting.getBufferDays())
				execution.setVariable("gracePeriod", setting.getCron());
		}	
	}
}