package com.camunda.poc.starter.controller.workflow;

import com.camunda.poc.starter.data.kase.entity.Case;
import com.camunda.poc.starter.data.kase.repo.KaseRepository;
import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.apache.http.entity.ContentType;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;

@Controller
public class WorkflowBatchController {

	@Value("${camunda.host}")
	String camundaHost;

	@Value("${camunda.port}")
	String camundaPort;

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	private KaseRepository repository;

	@Autowired
	public WorkflowBatchController(KaseRepository repository) {
		this.repository = repository;
	}

	/**
	 * Start a workflow sync with REST
	 * @param data
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/workflow/batch/start", method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<?> start(@RequestBody(required = false)String data)
			throws IOException, InterruptedException {

//		LOGGER.info("\n\n Start Batch Workflow with data: "+ data +"\n\n");

		repository.findAll().forEach(aCase -> {

//			LOGGER.info("\n\n Start Workflow with data: "+ aCase.toString() +"\n\n");

			try {
				JSONObject jsCaseData = new JSONObject(aCase);
//				LOGGER.info("\n\n Start Workflow with case data: "+ jsCaseData +"\n\n");

				JSONObject workflowData = new JSONObject(data);
//				LOGGER.info("\n\n Start Workflow with wf data: "+ workflowData +"\n\n");

				workflowData.put("messageName", workflowData.get("workflowKey"));
				workflowData.put("businessKey", jsCaseData.get("key"));
				workflowData.put("processVariables", new JSONObject().put("case", new JSONObject().put("value", jsCaseData.toString())
																	 .put("type", "Json")));

				LOGGER.info("\n\n Start Workflow with data: "+ workflowData.toString() +"\n\n");

				Response response = Request.Post("http://"+camundaHost+":"+camundaPort+"/engine-rest/message")
					.bodyString(workflowData.toString(), ContentType.APPLICATION_JSON).execute();

				Integer code = response.returnResponse().getStatusLine().getStatusCode();
				if(code == 200 || code == 202 || code == 204){
//					repository.delete(aCase);
					LOGGER.info("\n\n Workflow started with data: "+ workflowData.toString() +"\n\n");

				}else{
					throw new Exception("Bad Request "+ response.returnResponse().getStatusLine());
				}

			} catch (IOException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}

		} );

		return new ResponseEntity<>(HttpStatus.OK);
	};

}