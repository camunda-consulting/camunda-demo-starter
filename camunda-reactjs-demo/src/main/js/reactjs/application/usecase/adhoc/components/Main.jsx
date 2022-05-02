/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');
const client = require('client');
const follow = require('follow'); // function to hop multiple links by "rel"

// tag::customComponents
const StartForm = require('StartForm');
const DetailForm = require('DetailForm');
const ConfirmationForm = require('ConfirmationForm');
const CaseInfo = require('CaseInfo');
const FormInfo = require('FormInfo');
const UserInfo = require('UserInfo');
const FilterBar = require('FilterBar');
const Workflow = require('WorkflowMain');
const WorkflowStartAction = require('WorkflowStartAction');

// tag::vars[]
const dataApiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}:${process.env.DATA_API_PORT}` : "/";
const dataApi = `${dataApiHost}${process.env.DATA_API_ROOT}`;

const cloudApiHost = process.env.CLOUD_API_CLIENT_HOST != "" ? `${process.env.CLOUD_API_CLIENT_HOST}:${process.env.CLOUD_API_CLIENT_PORT}` : "/";
const cloudApi = `${cloudApiHost}${process.env.CLOUD_API_CONTEXT}`;

// end::vars[]

class Main extends React.Component{
  constructor(props) {
        super(props);
        this.state = {
        submission: {},
        submissions: [],
        formProps: {
            message: "",
            email: "",
            readingTime: "2021-05-13T00:00:00.000Z"
        },
        user: {},
        workflow: {
            key: process.env.WORKFLOW_KEY,
        },
        displayStartForm: "block",
        displayDetailForm: "none",
        displayConfirmationForm: "none",
        displayConfirmation: "none",
        attributes: [],
        pageSize: 10,
        links: {},
        callUpdateAll: function (pageSize, that) {
            console.log("callUpdateAll");
            that.loadObjectsFromServer(pageSize, 'cases');
            that.loadUserFromServer("paul.lungu@camunda.com");
        },
        callUpdateItem: function (key, that) {
            console.log("Detail => callUpdateItem: "+ JSON.stringify(key));
            that.loadByKeyFromServer(key)
            that.loadUserFromServer("paul.lungu@camunda.com");
        }
      };
      this.toggleForm = this.toggleForm.bind(this)
      this.uuidv4 = this.uuidv4.bind(this);
      this.handleStart = this.handleStart.bind(this);
      this.handleUpdateState = this.handleUpdateState.bind(this);
      this.handleUpdateStartState = this.handleUpdateStartState.bind(this);
      this.post = this.post.bind(this);
  }

    // tag::did-mount[]
    componentDidMount() {
        console.log("Detail Component Did Mount");
        this.state.callUpdateAll(this.state.pageSize, this);
    }
    // end::did-mount[]

    // ********************************************************
    //  Form Helper Functions
    // ********************************************************

    toggleForm(form){
        if (form == "detail"){
          this.setState({
              displayStartForm: "none",
              displayDetailForm: "block",
              displayConfirmation:"none",
              displayConfirmationForm:"none"
          });
      }else if (form == "start"){
          this.setState({
              displayStartForm: "block",
              displayDetailForm: "none",
              displayConfirmation:"none",
              displayConfirmationForm:"none"
          });
        }else if (form == "confirm"){
            this.setState({
                displayStartForm: "none",
                displayDetailForm: "none",
                displayConfirmation:"none",
                displayConfirmationForm:"block"
            });
        }else if (form == "confirmed"){
            this.setState({
                displayStartForm: "none",
                displayDetailForm: "none",
                displayConfirmation:"block",
                displayConfirmationForm:"none"
            });
        }
    }

    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    // ********************************************************
    //  State Update Functions
    // ********************************************************

    handleUpdateState(target, obj) {
        console.log("Detail => handleUpdateState: "+ target)

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log("Detail -> handleUpdateState: " + `${name} : ${value}`);

        obj[name] = value;

        this.setState({
            formProps: obj,
        });

        console.log(`Detail => handleUpdateState: ${JSON.stringify(this.state.formProps)}`)
    }

    handleUpdateStartState(key) {
        console.log("Detail => handleUpdateStartState : "+ JSON.stringify(key));

        this.state.callUpdateItem(key, this);

        this.toggleForm("detail");
    }

    // ********************************************************
    //  Submit Functions
    // ********************************************************

    handleStart(){

        let data = {};
        data.key = this.state.workflow.key;
        if (data.key == null)
            data.key = this.uuidv4();

        data.variables = {
                            caseId: this.state.submission.key,
                            message: this.state.formProps.message,
                            email: this.state.formProps.email,
                            readingTime: this.state.formProps.readingTime
                         };


        console.log("Adhoc -> Main -> Handle Start: " + JSON.stringify(data));

        //post the object to the endpoint to save the entity
        this.post("POST", data, cloudApi);

        this.state.callUpdateAll(this.state.pageSize, this);

        this.toggleForm("confirmed");
    }

    // end::on-delete[]
    post(method, obj, context) {
        if(method == null){
            method = "POST"
        }
        console.log(`POST Started - METHOD:${JSON.stringify(method)} OBJECT:${JSON.stringify(obj)} CONTEXT: ${JSON.stringify(context)}`);

        client({
            method: method,
            path: context,
            entity: obj,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            if (response.status.code == 200){
                console.log("POST Request Complete"+ JSON.stringify(response));
            }
        });
    }


    // ********************************************************
    //  Load Functions
    // ********************************************************

    // tag::follow-2[]
    loadObjectsFromServer(pageSize, obj) {
        follow(client, dataApi, [
                {rel: obj, params: {size: pageSize}}
                // {rel: 'search'},
                // {rel: 'findSubmissionByStarted', params: {started: true}}
            ]
        ).then(itemCollection => {
            return client({
                method: 'GET',
                path: itemCollection.entity._links.self.href,
                headers: {'Accept': 'application/json'}
            }).then(schema => {
                this.schema = schema.entity;
                return itemCollection;
            });
        }).done(itemCollection => {
            console.log("loadObjectsFromServer: "
                +JSON.stringify(itemCollection.entity._embedded.cases))
            this.setState({
                submissions: itemCollection.entity._embedded.cases,
                // attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }
    // end::follow-2[]

    // tag::on-loadByKeyFromServer[]
    loadByKeyFromServer(key) {
        follow(client, dataApi, [
            {rel: 'cases'},
            {rel: 'search'},
            {rel: 'findCaseByKey', params: {key: key}}
          ]
        ).then(itemCollection => {
            return client({
                method: 'GET',
                path: itemCollection.entity._links.self.href,
                headers: {'Accept': 'application/json'}
            }).then(schema => {
                this.schema = schema.entity;
                return itemCollection;
            });
        }).done(itemCollection => {
            console.log("loadByKeyFromServer: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                submission: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

    // tag::on-loadUserFromServer[]
    loadUserFromServer(email) {
        follow(client, dataApi, [
                {rel: 'users'},
                {rel: 'search'},
                {rel: 'findContactByEmail', params: {email: email}}
            ]
        ).then(itemCollection => {
            return client({
                method: 'GET',
                path: itemCollection.entity._links.self.href,
                headers: {'Accept': 'application/json'}
            }).then(schema => {
                this.schema = schema.entity;
                return itemCollection;
            });
        }).done(itemCollection => {
            console.log("loadUserFromServer: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                user: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

  // ********************************************************
  // React Render Function
  // ********************************************************
  render(){

      var displayStartForm = this.state.displayStartForm;
      var displayDetailForm = this.state.displayDetailForm;
      var displayConfirmation = this.state.displayConfirmation;
      var displayConfirmationForm = this.state.displayConfirmationForm;

      var info = "";
      var workflow = "";

      console.log("Main Render Submission: "+JSON.stringify(this.state.submission));

      if (this.state.submission.key != null) {
          console.log("Detail Render: "+JSON.stringify(this.state.submission));

          workflow =  <Workflow businessKey={this.state.submission.businessKey}/>
      }

    return (
      <div>

        <FilterBar toggleForm={this.toggleForm} title="Use Case Submission"/>

        <div style={{display: displayStartForm}}>
            <div className="my-form start-form">
                <div className="small-8 small-offset-2 large-8 large-offset-2 columns">
                   <StartForm onUpdateStartState={this.handleUpdateStartState}
                              onStart={this.handleStart}
                              submissions={this.state.submissions}
                              submission={this.state.submission} />
                </div>
            </div>
        </div>

        <div style={{display: displayDetailForm}}>

            <div className="small-9 small-offset-1 columns">
                <CaseInfo item={this.state.submission} />
            </div>
            <div className="small-6  columns">
                <UserInfo user={this.state.user} />
            </div>
            <div className="small-6  columns">
                <FormInfo formProps={this.state.formProps} />
            </div>

            <div className="workflow-info">
                {workflow}
            </div>

            <div className="my-form detail-form">
                <div className="small-12 large-12 small-offset-1 columns form-registration-group" >
                    <DetailForm formProps={this.state.formProps}
                        workflow={this.state.workflow}
                        onUpdateState={this.handleUpdateState} />
                </div>
            </div>

            <WorkflowStartAction onStart={this.handleStart} />
        </div>

        <div style={{display: displayConfirmationForm}}>
            <ConfirmationForm formProps-={this.state.formProps}
                              onStart={this.handleStart}
                              toggleForm={this.toggleForm} />
        </div>

        <div style={{display: displayConfirmation}}>
          <div className="my-form confirmation">
              <h3>Your submission is complete.</h3>
          </div>
        </div>
      </div>
    )
  }//End Render

}

module.exports = Main;
