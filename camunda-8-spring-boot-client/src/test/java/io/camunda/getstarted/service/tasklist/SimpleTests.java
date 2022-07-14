package io.camunda.getstarted.service.tasklist;

import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.assertEquals;

public class SimpleTests {

    @Test
    public void parseFormKeyTest() {
        String formKey = "camunda-forms:bpmn:userTaskForm_1nr1l3n";

        String formId1 = formKey.substring(formKey.lastIndexOf(":")+1);
        assertEquals("userTaskForm_1nr1l3n", formId1);

        String formId = TaskListServiceImpl.parseFormIdFromKey(formKey);
        assertEquals("userTaskForm_1nr1l3n", formId);
    }

}
