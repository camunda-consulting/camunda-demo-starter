package com.camunda.poc.starter.controller.ui;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.logging.Logger;

@Controller
public class UiApplicationController {

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	public UiApplicationController() {
	}

	@RequestMapping("/app.html")
	public String index() {
		return "app";
	}

}