package com.camunda.poc.starter.controller.workflow;

import com.camunda.poc.starter.pubsub.Event;
import com.camunda.poc.starter.pubsub.EventChannels;
import com.camunda.poc.starter.data.user.entity.User;
import com.camunda.poc.starter.data.submission.entity.Submission;
import com.camunda.poc.starter.data.user.repo.UserRepository;
import com.camunda.poc.starter.data.submission.repo.SubmissionRepository;
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
    private UserRepository userRepository;

    @Autowired
    public WorkflowAsyncController(EventChannels source,
                                   SubmissionRepository repository,
                                   UserRepository userRepository){
        this.source = source;
        this.repository = repository;
        this.userRepository = userRepository;
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

        //get the request parameters out of the request object
        JSONObject jsonRequestParam = new JSONObject(data);
        String workflowKey = jsonRequestParam.getString("workflowKey");
        String businessKey = jsonRequestParam.getString("businessKey");

        //Get the data from our business API's
        Submission repoObj = repository.findSubmissionByBusinessKey(businessKey);
        User contact = userRepository.findById(1L).get();

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
        params.put("workflowKey", workflowKey);
        event.setEventParams(params);

        // Publish the message
        Boolean sent = source.publish().send(MessageBuilder.withPayload(event).build());
        LOGGER.info("\n\n Event Payload Sent: " + event + "\n");

        // *** Shouldn't do this here instead create a listener and update based on published event.
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
