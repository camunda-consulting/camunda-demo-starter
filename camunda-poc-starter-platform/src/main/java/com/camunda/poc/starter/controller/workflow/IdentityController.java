package com.camunda.poc.starter.controller.workflow;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.camunda.bpm.engine.AuthorizationService;
import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.identity.Group;
import org.camunda.bpm.engine.identity.User;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.logging.Logger;

@Profile("identity")
@RestController
public class IdentityController {

    private IdentityService identityService;

    @Autowired
    public IdentityController(AuthorizationService authorizationService,
                              IdentityService identityService){
        this.identityService = identityService;
    }

    private final Logger LOGGER = Logger.getLogger(Class.class.getName());

    /**
     *
     * @param data
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/workflow/auth/scim/create/user", method = RequestMethod.POST, consumes = {"application/json"})
    public ResponseEntity<HttpStatus> userCreate(@RequestBody(required = true)String data) throws Exception {

        LOGGER.info("\n\n ********************** Create Camunda User *********************** \n\n ");

        LOGGER.info("\n\n  User data: "+ data +"\n");

        //get the request parameters out of the request object
        JSONObject jsonData = new JSONObject(data);
        String userId = jsonData.getString("userName");
        String givenName = jsonData.getJSONObject("name").getString("givenName");
        String familyName = jsonData.getJSONObject("name").getString("familyName");

        User user = null;
        user = identityService.createUserQuery().userId(userId).singleResult();
        if (user == null) {
            User uzr = identityService.newUser(userId);
            uzr.setPassword("demo");
            uzr.setFirstName(givenName);
            uzr.setLastName(familyName);
            identityService.saveUser(uzr);
            LOGGER.info("\n ********************** Camunda User Created: "+ uzr.getId());
        } else {
            throw new Exception("User already exists!");
        }

        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }

    @RequestMapping(value = "/workflow/auth/scim/delete/user", method = RequestMethod.DELETE, consumes = {"application/json"})
    public ResponseEntity<HttpStatus> userDelete(@RequestBody(required = true)String data) throws Exception {

        LOGGER.info("\n\n ********************** Delete Camunda User *********************** \n\n ");

        LOGGER.info("\n\n  User data: "+ data +"\n");

        //get the request parameters out of the request object
        JSONObject jsonData = new JSONObject(data);
        String userId = jsonData.getString("userName");

        User user = null;
        user = identityService.createUserQuery().userId(userId).singleResult();
        if (user != null) {
            identityService.deleteUser(user.getId());
            LOGGER.info("\n ********************** Camunda User Deleted: "+ user.getId());

        }else{
            throw new Exception("User doesn't exist!");
        }

        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }


    @RequestMapping(value = "/workflow/auth/scim/udpate/user", method = RequestMethod.POST, consumes = {"application/json"})
    public ResponseEntity<HttpStatus> groupCreate(@RequestBody(required = true)String data) throws Exception {

        LOGGER.info("\n\n ********************** Delete Camunda User *********************** \n\n ");

        LOGGER.info("\n\n  User data: "+ data +"\n");

        //get the request parameters out of the request object
        JSONObject jsonData = new JSONObject(data);
        String userId = jsonData.getString("userName");

        User user = null;

        //map the user properties from the SCIM payload

        user = identityService.createUserQuery().userId(userId).singleResult();
        if (user != null) {
            identityService.saveUser(user);
            LOGGER.info("\n ********************** Camunda User Deleted: "+ user.getId());

        }else{
            throw new Exception("User doesn't exist!");
        }

        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }

} //END CLASS
