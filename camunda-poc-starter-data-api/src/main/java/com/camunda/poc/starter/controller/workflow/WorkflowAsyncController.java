package com.camunda.poc.starter.controller.workflow;

import com.camunda.poc.starter.integration.pubsub.Event;
import com.camunda.poc.starter.integration.pubsub.EventChannels;
import com.camunda.poc.starter.poc.submission.entity.User;
import com.camunda.poc.starter.poc.submission.entity.Submission;
import com.camunda.poc.starter.poc.submission.repo.ContactRepository;
import com.camunda.poc.starter.poc.submission.repo.SubmissionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Profile("async")
@RestController
public class WorkflowAsyncController {

    private final Logger LOGGER = Logger.getLogger(Class.class.getName());

    private EventChannels source;
    private SubmissionRepository repository;
    private ContactRepository contactRepository;

    @Autowired
    public WorkflowAsyncController(EventChannels source,
                                   SubmissionRepository repository,
                                   ContactRepository contactRepository){
        this.source = source;
        this.repository = repository;
        this.contactRepository = contactRepository;
    }

    /**
     * Start a workflow async with pub/sub
     * @param data
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/workflow/start/async", method = RequestMethod.POST, consumes = {"application/json"})
    public ResponseEntity<HttpStatus> startAsync(@RequestBody(required = true)String data) throws JsonProcessingException {

        LOGGER.info("\n\n  Workflow Start Async: "+ data +"\n");

        JSONObject json = new JSONObject(data);

        Submission repoObj = repository.findSubmissionByBusinessKey(json.getString("businessKey"));
        User contact = contactRepository.findById(1L).get();

        LOGGER.info("\n\n  Repo Data: "+ repoObj.getSubmissionStatusDate() +"\n");

        //Create meta-data about the event
        Event event = new Event();
        event.setEventName(Event.START_WORKFLOW_EVENT);
        event.setCreated(new Date());
        event.setEventType(Event.START);

        ObjectMapper objectMapper = new ObjectMapper();
        String submission = objectMapper.writeValueAsString(repoObj);
        String user = objectMapper.writeValueAsString(contact);

        LOGGER.info("\n\n  Workflow Mapped Data: "+ submission +"\n");

        // Put all the variables into top level object
        Map params = new HashMap<String, Object>();
        params.put("submission", submission);
        params.put("user", user);
        params.put("workflowKey", json.getString("businessKey"));
        event.setEventParams(params);

        // Publish the message
        Boolean sent = source.publish().send(MessageBuilder.withPayload(event).build());
        LOGGER.info("\n\n Event Payload Sent: " + event + "\n");

        //Shouldn't do this here instead create a listener and update based on published event.
        if(sent) {
            repoObj.setStarted(true);
            repository.save(repoObj);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }

        return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
    }

    /**
     * Complete a task async with pub/sub
     * @param data
     * @return
     */
    @RequestMapping(value = "/task/complete/async", method = RequestMethod.POST, consumes = {"application/json"})
    public ResponseEntity<HttpStatus> completeAsync(@RequestBody(required = true) String data)
    {

        LOGGER.info("\n\n  Task Complete Async: "+ data +"\n");

        Event event = new Event();
        event.setEventName(Event.START_WORKFLOW_EVENT);
        Map<String, Object> params = new <String, Object>HashMap();
        params.put("processVariables", data);
        event.setEventParams(params);

        source.publish().send(MessageBuilder.withPayload(event).build());
        LOGGER.info("\n\n Event Payload Sent: "+data +"\n");

        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }
}
