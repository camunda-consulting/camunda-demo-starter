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
const Info = require('Info');
const FilterBar = require('FilterBar');

const Workflow = require('TaskHome');


// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class Detail extends React.Component{
  constructor(props) {
        super(props);
        this.state = {
        submission: {},
        submissions: null,
        items: [],
        contact: {},
        displayStartForm: "block",
        displayDetailForm: "none",
        displayConfirmationForm: "none",
        displayConfirmation: "none",
        attributes: [],
        pageSize: 10,
        links: {},
        callUpdateAll: function (pageSize, that) {
            console.log("callUpdateAll");
            that.loadStartedFromServer(pageSize);
            that.loadUserFromServer("paul.lungu@camunda.com");
        },
        callUpdateItem: function (key, that) {
            console.log("Detail => callUpdateItem: "+ JSON.stringify(key));
            that.loadByKeyFromServer(key)
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

    componentDidUpdate() {
      console.log("Detail Component Did Update");
    }

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

    handleUpdateState(target){
        console.log("Detail => handleUpdateState: "+ target)

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        //console.log("Detail -> handleUpdateState: " + `${name} : ${value}`);

        var submission = this.state.submission;

        submission[name] = value;

        this.setState({
            submission: submission
        });

        console.log(`Detail => handleUpdateState: submission => ${JSON.stringify(this.state.submission)}`)
    }

    handleUpdateStartState(key){
        console.log("Detail => handleUpdateStartState : "+ JSON.stringify(key));

        this.state.callUpdateItem(key, this);

        this.toggleForm("detail");
    }


    handleStart(e){
        e.preventDefault();

        var submission = {
            damageKey: this.uuidv4(),
            email: this.state.contact.email
        }

        console.log("Handle Start: " + JSON.stringify(submission));

        //post the object to the endpoint to save the entity
        this.post("POST", submission, apiRoot+"/submissions");

        this.state.callUpdateAll(this.state.pageSize, this);

        this.toggleForm("detail");
    }



    // tag::follow-2[]
    loadStartedFromServer(pageSize) {
        follow(client, apiRoot, [
                {rel: 'submissions', params: {size: pageSize}},
                {rel: 'search'},
                {rel: 'findSubmissionByStarted', params: {started: true}}
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
            console.log("loadStartedFromServer: "
                +JSON.stringify(itemCollection.entity._embedded.submissions))
            this.setState({
                submissions: itemCollection.entity._embedded.submissions,
                // attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }
    // end::follow-2[]

    // tag::on-loadByKeyFromServer[]
    loadByKeyFromServer(businessKey) {
        follow(client, apiRoot, [
            {rel: 'submissions'},
            {rel: 'search'},
            {rel: 'findSubmissionByBusinessKey', params: {businessKey: businessKey}}
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
        follow(client, apiRoot, [
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
                contact: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

    // end::on-delete[]
    async post(method, obj, context) {
        if(method == null){
            method = "POST"
        }
        console.log(`POST Started - METHOD:${JSON.stringify(method)} OBJECT:${JSON.stringify(obj)} CONTEXT: ${JSON.stringify(context)}`);

        await client({
            method: method,
            path: context,
            entity: obj,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            console.log("POST Request Complete"+ JSON.stringify(response));
            this.setState({
                submission: response.entity
            });
        });
    }

  render(){

      var displayStartForm = this.state.displayStartForm;
      var displayDetailForm = this.state.displayDetailForm;
      var displayConfirmation = this.state.displayConfirmation;
      var displayConfirmationForm = this.state.displayConfirmationForm;

      var info = "";
      var workflow = "";

      //console.log("Detail Render: "+JSON.stringify(this.state.submission));

      if (this.state.submission.id != null) {
         info =  <Info item={this.state.submission} contact={this.state.contact}/>
      }

      if (this.state.submission.businessKey != null) {
          console.log("Detail Render: "+JSON.stringify(this.state.submission));

          workflow =  <Workflow businessKey={this.state.submission.businessKey}/>
      }

    return (
      <div>

        <FilterBar toggleForm={this.toggleForm} title="Adhoc Submission Review"/>

        {info}

        <div style={{display: displayStartForm}}>
            <StartForm onUpdateStartState={this.handleUpdateStartState}
                              onStart={this.handleStart}
                              submissions={this.state.submissions}
                              submission={this.state.submission} />
        </div>

        <div style={{display: displayDetailForm}}>

            {workflow}

            <DetailForm submission={this.state.submission}
                       contact={this.state.contact}
                       onUpdateState={this.handleUpdateState}
                       post={this.post}
                       onRedirect={this.props.onRedirect}
                       toggleForm={this.toggleForm}/>
        </div>

        <div style={{display: displayConfirmationForm}}>
            <ConfirmationForm submission={this.state.submission}
                        contact={this.state.contact}
                        post={this.post}
                        toggleForm={this.toggleForm} />
        </div>

        <div style={{display: displayConfirmation}}>
          <div className="my-form">

              <div className="small-8 small-offset-2 large-8 large-offset-2 columns">
                  <div className="form-registration-group">

                      <h3>Your submission is complete.</h3>

                  </div>
              </div>

          </div>
        </div>

      </div>
    )
  }
}

module.exports = Detail;
