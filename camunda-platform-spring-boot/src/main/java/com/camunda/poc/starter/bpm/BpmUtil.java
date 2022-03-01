package com.camunda.poc.starter.bpm;

import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.Expression;
import org.camunda.bpm.engine.runtime.Execution;
import org.camunda.bpm.engine.variable.Variables;
import org.camunda.bpm.engine.variable.impl.value.ObjectValueImpl;
import org.camunda.spin.Spin;
import org.camunda.spin.SpinList;
import org.camunda.spin.impl.json.jackson.JacksonJsonNode;
import org.camunda.spin.json.SpinJsonNode;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.logging.Logger;

public final class BpmUtil {

    private static final Logger LOGGER = Logger.getLogger(Class.class.getName());

    //simulate a unpredicted error such as network down
    public static void simulateError(DelegateExecution execution) throws Exception {
        Boolean error = (Boolean) execution.getVariable("error");
        if (error != null){
            if (error) {
                throw new Exception("Something went wrong! Maybe the network is down.");
            }
        }
    }

    //get the workflow business key
    public static String getBusinessKey(DelegateExecution execution) {
        //Get the businessKey from the process
        String businessKey = execution.getBusinessKey();
        if (businessKey == null) {
            throw new Error("\n\n ====>> Error: Business Key Not Found For Process: " +execution.getProcessInstanceId());
        }
        return businessKey;
    }

    //set and ensure the business key exists
    public static SpinJsonNode setBusinessKey(DelegateExecution execution, SpinJsonNode bizObj) throws Exception {
        String businessKey = execution.getBusinessKey();
        Boolean hasKey = bizObj.hasProp("key");
        if (businessKey != null) {
            bizObj.prop("key", businessKey);
        } else if (hasKey) {
            execution.setProcessBusinessKey(bizObj.prop("key").stringValue());
        }else {
            throw new Exception("Could not find businessKey");
        }
        return bizObj;
    }

    //process expression - get message name key identifying the workflow to start
    public static String getWorkflowKey(DelegateExecution execution,
                                        Expression workflowKey) throws Exception {
        String wfKey = null;
        if (workflowKey != null) {
            return workflowKey.getValue(execution).toString();
        }else {
            throw new Exception("workflowKey not defined, please set the workflowKey field injection property");
        }
    }

    //process expression
    public static SpinJsonNode getBizObjectNode(DelegateExecution execution,
                                                Expression bizObject) throws Exception {
        if (bizObject != null) {
            //Get the business object
            SpinJsonNode json = (SpinJsonNode) bizObject.getValue(execution);
            LOGGER.info(" \n\n ====>> Biz Object " + json.toString() + "\n");
            return json;
        }else {
            throw new Exception("bizObject not defined, please set the bizObject field injection property");
        }
    }

    //process expression
    public static SpinJsonNode mutateBizObjectNode(DelegateExecution execution,
                                                Expression bizObject, Expression mutation) throws Exception {
        if (bizObject != null && mutation != null) {
            //Get the business object
            SpinJsonNode json = (SpinJsonNode) bizObject.getValue(execution);
            String value = (String) mutation.getValue(execution);
            String [] values = value.split(":");
            json.prop(values[0], values[1]);
            LOGGER.info(" \n\n ====>> Biz Object " + json.toString() + "\n");
            return json;
        }else {
            throw new Exception("bizObject or mutation not defined, please set the bizObject field injection property");
        }
    }

    //process expression
    public static String getSearchTermString(DelegateExecution execution,
                                             Expression searchTerm) throws Exception {

        //Get the searchterm from the field injection expression
        if (searchTerm != null) {
            return searchTerm.getValue(execution).toString();
        } else {
            throw new Exception("searchTerm Not Defined, please set the searchTerm field injection property");
        }
    }

    //process expression
    public static String getBizObjectNameString(DelegateExecution execution,
                                                Expression bizObjectName) throws Exception {
        if (bizObjectName != null) {
            return bizObjectName.getValue(execution).toString();
        }else {
            throw new Exception("bizObjectName not defined, please set the bizObjectName field injection property");
        }
    }

        //set the object into the workflow
    public static void setBizObject(DelegateExecution execution,
                                    Expression bizObjectName,
                                    SpinJsonNode bizObj) throws Exception {
        String bizObjectNameStr = getBizObjectNameString(execution, bizObjectName);
        if (bizObj != null) {
            LOGGER.info(" \n\n ====>> Biz Object " + bizObj.toString() + "\n");
            execution.setVariable(bizObjectNameStr, bizObj);
        } else {
            throw new Error("\n\n ====>> Error: Workflow not updated: " + bizObjectNameStr);
        }
    }

    //set the list into the workflow
    public static void setBizObject(DelegateExecution execution,
                                    Expression bizObjectName,
                                    ObjectValueImpl bizObj) throws Exception {

        //Get the name of the object to presist in the workflow from the field injection property
        if (bizObjectName != null) {
            String bizObjectNameStr = bizObjectName.getValue(execution).toString();
            if (bizObj != null) {
                LOGGER.info(" \n\n Biz Object List " + bizObj.getValue().toString() + "\n");
                execution.setVariable(bizObjectNameStr, bizObj);
            } else {
                throw new Error("\n\n ====>> Error: Workflow not updated: " + bizObjectNameStr);
            }
        }else {
            throw new Exception("bizObjectName not defined, please set the bizObjectName field injection property");
        }
    }

    public static ObjectValueImpl createSerializableList(SpinList spinList) {
        //Convert and Serialize the Spin list as ArrayList so we can use as collection
        List<String> objs = new ArrayList<String>();
        for (int i=0; i<spinList.size(); i++) {
            objs.add(SpinJsonNode.JSON(spinList.get(i)).toString());
        }

        ObjectValueImpl values = (ObjectValueImpl) Variables.objectValue(objs)
                .serializationDataFormat(Variables.SerializationDataFormats.JSON)
                .setTransient(false)
                .create();
        values.setObjectTypeName("java.util.ArrayList");

        return values;
    }

    public static Date formatDate(String date) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH);
        return formatter.parse(date);
    }

}
