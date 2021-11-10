/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('client');
const follow = require('follow'); // function to hop multiple links by "rel"

// tag::customComponents
const List = require('TaskList');
const Detail = require('TaskDetail');
// tag::customComponents

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const camApiRoot = `${apiHost}${process.env.CAMUNDA_API_ROOT}`;
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

// tag::app[]
class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            task: null,
            workflowVariables: {variables:{}, withVariablesInReturn: true},
            policy: {},
            isLoading: false,
            attributes: [],
            pageSize: 10,
            links: {},
            displayDetail: "none",
            displayList: "block",
            displayInfo: "none",
            displayLine: "block",
            toggleDetailInfo: "off",
            callUpdate: function (pageSize, that) {that.loadAllFromServer(pageSize)}
        };
        // this.updatePageSize = this.updatePageSize.bind(this);
        // this.onNavigate = this.onNavigate.bind(this);
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleUpdatePolicy = this.handleUpdatePolicy.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        // this.handleToggleClick = this.handleToggleClick.bind(this);
        // this.handleFilterAll = this.handleFilterAll.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.updateWorkflowVariables = this.updateWorkflowVariables.bind(this);
        this.post = this.post.bind(this);
    }

    // tag::update-page-size[]
    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
          this.state.callUpdate(pageSize, this);
        }
    }
    // end::update-page-size[]

    // tag::follow-1[]
    componentDidMount() {
        this.loadAllFromServer(this.state.pageSize);
    }
    // end::follow-1[]

    updateWorkflowVariables(variables) {
        let updatedVariables = this.state.workflowVariables;
        updatedVariables.variables = variables;
        this.setState({
            workflowVariables: updatedVariables
        });
    }

    handleApprove(task){

        let variables = this.state.workflowVariables;

        console.log("Task -> Home -> HandleApprove: " + JSON.stringify(variables));

        this.post('POST', variables, `engine-rest/task/${this.state.task.id}/complete`);

        this.props.history.push('/tasks#');
    }

    handleReject(e){
        e.preventDefault();
        var serviceRequest = this.state.task.serviceRequest;
        serviceRequest.rejected = true;
        console.log("HandleReject: " + JSON.stringify(serviceRequest));
        this.post(serviceRequest, "sr/save");
        this.post(serviceRequest, "sr/task/reject");
        this.props.history.push('/tasks');
    }


    handleStart(e){
        e.preventDefault();
        var task = this.state.task;
        var policy = this.state.policy;

        console.log("Task -> Home -> HandleStart: " + JSON.stringify(task));
        console.log("Task -> Home -> HandleStart: " + JSON.stringify(policy));

        this.post('POST', {"messageName" : "start-credit-check-event", "businessKey" : policy.coPolicyNo }, `engine-rest/message`);
        // this.post("PATCH", {creditCheckStarted: true}, `api/policyEntities/${policy.id}`)

        this.props.history.push('/tasks');
    }

    post(method, obj, context) {
        console.log("ORDER -> HOME -> POST == Started")
        client({
            method: method,
            path: apiHost+context,
            entity: obj,
            headers: {'Content-Type': 'application/json', 'Accept':'*/*'}
        }).done(response => {
            console.log("ORDER -> HOME -> POST: "+JSON.stringify(response));
        });
    }

    // post(obj, context) {
    //     console.log("POST Started")
    //     client({
    //         method: 'POST',
    //         path: apiHost+context,
    //         entity: obj,
    //         headers: {'Content-Type': 'application/json'}
    //     }).done(response => {
    //         console.log("POST Request Complete");
    //     });
    // }

    // tag::follow-2[]
    loadAllFromServer(pageSize) {
        follow(client, camApiRoot+'/task',
            [{rel: 'task'}]
        ).done(taskCollection => {
            console.log("TASK COLLECTIONS::: "+JSON.stringify(taskCollection));
            this.setState({
                tasks: taskCollection
            });
        });
    }
    // end::follow-2[]

    // tag::navigate[]
    // onNavigate(navUri) {
    //     client({method: 'GET', path: navUri}).done(taskCollection => {
    //         this.setState({
    //             tasks: taskCollection.entity._embedded.tasks,
    //             attributes: this.state.attributes,
    //             pageSize: this.state.pageSize,
    //             links: taskCollection.entity._links
    //         });
    //     });
    // }
    // end::navigate[]

    // handleFilterAll(pageSize){
    //   this.loadAllFromServer(pageSize);
    //   this.setState({
    //     callUpdate: function (pageSize, that) {that.loadAllFromServer(pageSize)}
    //   });
    // }

    handleSelectedItem(task) {

        if (task == null){
            alert("You don't have a task to complete.");
        }else {
            console.log("Task: "+ JSON.stringify(task));
            this.setState({
                task: task,
                displayDetail: "block",
                displayList: "none"
            });
        }
    }


    handleUpdatePolicy(policy){

        console.log("Task -> Home -> handleUpdatePolicy: "+ JSON.stringify(policy))

        this.loadPolicyFromServer(policy.coPolicyNo)

    }

    // handleDelete(e){
    //     e.preventDefault;
    //     alert("Sure you want to delete this property? Press the [esc] button to cancel this action.");
    //     this.props.onDelete(this.props.task);
    // }

    handleBackClick(e){
       console.log("handleBackClick");
       this.setState({
           displayDetail: "none",
           displayList: "block"
         });
    }

    // handleToggleClick(e){
    //     if (this.state.toggleDetailInfo === "off"){
    //         this.setState({
    //           toggleDetailInfo: "on",
    //           displayInfo: "block",
    //           displayLine: "none"
    //         });
    //     }else {
    //         this.setState({
    //             toggleDetailInfo: "off",
    //             displayInfo: "none",
    //             displayLine: "block"
    //           });
    //
    //     }
    // }

    // loadTaskFromServer(businessKey){
    //   client({
    //       method: 'GET',
    //       path: apiHost+"engine-rest/task",
    //       params: {processInstanceBusinessKey: businessKey},
    //       headers: {'Accept': 'application/json'}
    //   }).done(response => {
    //       this.setState({
    //           task: response.entity[0]
    //       });
    //   });
    // }

    // tag::on-loadOrderFromServer[]
    loadPolicyFromServer(id) {
        follow(client, apiRoot, [
                {rel: 'policyEntities'},
                {rel: 'search'},
                {rel: 'findPolicyEntitiesByCoPolicyNo', params: {coPolicyNo: id}}
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
            console.log("Task -> Home -> loadPolicyFromServer: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                policy: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

    render() {
      var item = "";
      if (this.state.task !== null) {
        item = <Detail  task={this.state.task}
                        policy={this.state.policy}
                        updateWorkflowVariables={this.updateWorkflowVariables}
                        displayInfo={this.state.displayInfo}
                        displayLine={this.state.displayLine}
                        handleReject={this.handleReject}
                        handleApprove={this.handleApprove}
                        handleStart={this.handleStart}
                        handleUpdatePolicy={this.handleUpdatePolicy} />
      }

      return (
          <div>

            <div style={{display: this.state.displayList}}>
              <List tasks={this.state.tasks}
                    links={this.state.links}
                    pageSize={this.state.pageSize}
                    onNavigate={this.onNavigate}
                    onUpdateNote={this.onUpdateNote}
                    updatePageSize={this.updatePageSize}
                    onSelectItem={this.handleSelectedItem}
                    onFilterAll={this.handleFilterAll} />
            </div>

            <div style={{display: this.state.displayDetail}}>
              <div className="top-bar show-for-medium small-12 columns">
               <div className="top-bar-left">
                 <ul className="menu">
                   <li className="topbar-title">
                     Task Detail
                   </li>
                 </ul>
               </div>
               <div className="top-bar-right">
                 <ul className="menu">
                   <li className="topbar-title">
                     <a className="button" onClick={this.handleBackClick}>Back</a>
                   </li>
                 </ul>
               </div>
              </div>
              <div>
                  {item}
              </div>
            </div>

          </div>
      )
    }
}
// end::app[]

module.exports = home;
