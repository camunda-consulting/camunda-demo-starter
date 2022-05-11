package com.camunda.poc.starter.controller.ui;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.logging.Logger;

@Controller
public class UiApplicationController {

	private final Logger LOGGER = Logger.getLogger(Class.class.getName());

	public UiApplicationController() {
	}

	private String homePage() {
		return "app";
	}
	@RequestMapping("/")
	public String index() {
		return homePage();
	}

	@RequestMapping("/app.html")
	public String app() {
		return homePage();
	}

}