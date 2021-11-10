package com.camunda.poc.starter.usecase.renewal.bpm;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.logging.Logger;

@Profile("renewal")
@Component("renewalStateListener")
public class RenewalStateListener implements ExecutionListener {

    public static Logger log = Logger.getLogger(Class.class.getName());

//    RenewalRepository renewalRepository;

//    @Autowired
//    public RenewalStateListener(RenewalRepository renewalRepository){
//        this.renewalRepository = renewalRepository;
//    }

    @Override
    public void notify(DelegateExecution execution) throws Exception {
//        String taskName = execution.getCurrentActivityName();
//        Renewal renewal = renewalRepository
//                .findRenewalByBusinessKey(execution.getProcessBusinessKey());
//        renewal.setWorkflowState(taskName);
//        log.info("\n\n Renewal: "+renewal);
//        renewalRepository.save(renewal);
//        log.info("\n\n Updating Renewal State with Task: "+taskName);
    }
}
