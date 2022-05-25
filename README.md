# Camunda Demo Starter

The purpose of this project is to have a starter for PoC and other less structured engagements. This enables the consultant to easily discuss and demonstrate common concepts and patterns without customizing the application. Additionally it can be used as a starter project in many cases.

## Quick Start

Follow the steps below to use Docker Compose to quickly start a fully functioning Camunda environment (either version 7 or version 8).

* Create a new directory named `camunda-demo`

  ```bash
  mkdir camunda-demo
  ```

* Change into this new directory. (All steps below assume you are in this new `camunda-demo` directory)

  ```bash
  cd camunda-demo
  ```
 
 * [Authenticate to the Github container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry)
 
  ```bash
  docker login ghcr.io -u username -p PAT
  ```

* Now jump to either [Camunda 8](#Camunda-8) or [Camunda 7](#Camunda-7) sections below.

---

## Camunda 8

* Clone the `Camunda Platform` project into your local `camunda-demo` directory.

  ```bash
  git clone https://github.com/camunda/camunda-platform.git
  ```
  
* Clone this project (the `camunda-demo-starter` project) into your local `camunda-demo` directory.
   
  ```bash
  git clone https://github.com/camunda-consulting/camunda-demo-starter.git
  ```

* Start a Camunda 8 environment from your `camunda-demo` directory

  ```bash
  cd camunda-demo
  ```

  ```bash
  docker-compose -f ./camunda-demo-starter/docker-compose.postgres.yml \
                -f ./camunda-demo-starter/docker-compose.data-api.yml \
                -f ./camunda-demo-starter/docker-compose.reactjs.yml \
                -f ./camunda-demo-starter/docker-compose.smtp.yml \
                -f ./camunda-platform/docker-compose-core.yaml \
                -f ./camunda-demo-starter/docker-compose.c8.yml \
                up -d
  ```

#### After the environment starts up, access each of the components like so:
- camunda-react: http://localhost:3000
- operate: http://localhost:8081
    - username/password: demo/demo
- tasklist: http://localhost:8082
- TODO: optimize isn't currently included .. should we include it as part of default? optimize: http://localhost:808?
- c8-client: http://localhost:9012 
- data-api: http://localhost:9000 
- camunda-postgres: localhost:5432 
  - username/password: camunda/camunda
- zeebe: localhost: 26500

### C8 - How to customize for typical PoT

TODO: finish this section. Describe how to add new data and process diagrams
#### Deploy Process Diagrams

#### Add Custom Data

[Adding Data Model to Data API](Link to DataApi Docs)


#### How to use the C8 Client
- Connect to mock services


### C8 - How to customize for advanced PoC

TODO: finish this section. Describe how to add new data and process diagrams
### Deploy Process Diagrams
- Sames as described in the PoT section

### Add Custom Data
- Sames as described in the PoT section

### Connect to real services

### Modify a component (Like the ReactJS UI)

### Add a new component

---

### Camunda 7

* Clone this project (the `camunda-demo-starter` project) into your local `camunda-demo` directory

  ```
  git clone https://github.com/camunda-consulting/camunda-demo-starter.git
  ```
  
* Start a Camunda 7 environment

  ```
  docker-compose  -f ./camunda-demo-starter/docker-compose.postgres.yml
                 -f ./camunda-demo-starter/docker-compose.data-api.yml
                 -f ./camunda-demo-starter/docker-compose.smtp.yml
                 -f ./camunda-demo-starter/docker-compose.c7.yml
                 up -d
  ```

#### After the environment starts up, access each of the components like so:

- camunda-react: http://localhost:3000
- operate: http://localhost:8082 (TODO: verify this)
    - username/password: demo/demo
- data-api: http://localhost:9000 (TODO: verify this)
- optimize: http://localhost:8082 (TODO: verify this)
- tasklist: http://localhost:8081 (TODO: verify this)
- camunda-postgres: localhost:5432
    - username/password: camunda/camunda

## C7 - How to customize for typical PoT

TODO: finish this section. Describe how to add new data and process diagrams
### Deploy Process Diagrams

### Add Custom Data


#### How to use the C8 Client
- Connect to mock services

## C7 - How to customize for advanced PoC

TODO: finish this section. Describe how to add new data and process diagrams
### Deploy Process Diagrams
- Sames as described in the PoT section

### Add Custom Data
- Sames as described in the PoT section

### Connect to real services

### Modify a component (Like the ReactJS UI)

### Add a new component

---

## Architecture

The diagram generically depicts the components and how they interact.

![PoT Architecture](./images/pot-architecture.png "PoT Architecture")

## Components

### camunda-demo-starter

TODO: link to github and short description

This camunda-demo-starter project contains reusable code for mimicking business data services, integration services, and front end UI’s. This reduces the time it takes to build demos. It also provides examples of proven, consistent, reusable system design patterns.


### camunda-8-spring-boot-client

TODO: link to github and short description

### camunda-platform-7-spring-boot

TODO: link to github and short description

### camunda-7-spring-boot-client

TODO: link to github and short description

### camunda-data-api

TODO: link to github and short description

### camunda-react

TODO: link to github and short description

<!--
//### camunda-servlet-project
//
//TODO: link to github and short description
//
//### camunda-tomcat-docker
//
//TODO: link to github and short description
//
//### camunda-kafka
//
//TODO: link to github and short description
//
//### camunda-ldap
//
//TODO: link to github and short description
//
//### camunda-postman
//
//TODO: link to github and short description
//
//### camunda-dmn-worker
//
//TODO: link to github and short description
//
//### Authentication and Authorization
//
//TODO: describe using identity for securing the data api and rest apis?
-->
---

## Presentation Slide Template

[Proof of Technology Google Slides Template](https://docs.google.com/presentation/d/1fI7mdW_Q6yEiM0H01b58aQVa74YkTnYj/)

---
## How to contribute to this project

- Read the documentation on each project below. 
- Fork the project from github into a new repository and checkout into a local project directory.
- Each project contains a README describing how to setup a development environment and make code changes.
- Make your changes and work in your fork.
- If you have a contribution that isn't specific to a customer create a pull request on the project

---

## How to create an issue

[Create an issue](https://github.com/camunda-consulting/camunda-demo-starter/issues/new/choose) in the project for feature requests and bugs.

---

![Compatible with: Camunda Platform 7](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%207-26d07c)

![Compatible with: Camunda Platform 8](https://img.shields.io/badge/Compatible%20with-Camunda%20Platform%208-0072Ce)

[![](https://img.shields.io/badge/Lifecycle-Proof%20of%20Concept-blueviolet)](https://github.com/Camunda-Community-Hub/community/blob/main/extension-lifecycle.md#proof-of-concept-)

<!-- [![](https://img.shields.io/badge/Lifecycle-Incubating-blue)](https://github.com/Camunda-Community-Hub/community/blob/main/extension-lifecycle.md#incubating-) -->
