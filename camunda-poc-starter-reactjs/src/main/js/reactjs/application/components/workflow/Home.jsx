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
const Detail = require('TaskDetail');
// tag::customComponents

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.CAMUNDA_API_PORT}/${process.env.CAMUNDA_API_ROOT}` : "/engine-rest";
const workflowContext = process.env.WORKFLOW_CONTEXT_PATH != "" ? `${process.env.WORKFLOW_CONTEXT_PATH}` : "process-instance";
const uri = apiHost+"/"+workflowContext
// end::vars[]

// tag::app[]
class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workflow: null,
            displayDetail: "block",
            displayInfo: "block",
            toggleDetailInfo: "off",
            callUpdate: function (key, that) {that.loadOneFromServer(key)}
        };
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.post = this.post.bind(this);
        this.loadOneFromServer = this.loadOneFromServer.bind(this);
    }


    // tag::componentDidMount-1[]
    componentDidMount() {
        console.log("workflow=>home=>componentDidMount: "+this.props.businessKey)
        this.state.callUpdate(this.props.businessKey, this)
    }
    // end::componentDidMount-1[]


    loadOneFromServer(businessKey){
        client({
            method: 'GET',
            path: uri,
            params: {businessKey: businessKey},
            headers: {'Accept': 'application/json'}
        }).done(response => {
            console.log("workflow=>home=>loadOneFromServer: "+JSON.stringify(response))
            this.setState({
                workflow: response.entity[0]
            });
        });
    }

    handleApprove(e){
        e.preventDefault();

        this.props.history.push('/workflows#');
        this.handleBackClick();
    }

    handleReject(e){
        e.preventDefault();
        this.props.history.push('/rejected');
    }

    post(obj, context) {
        console.log("POST Started")
        client({
            method: 'POST',
            path: apiHost+context,
            entity: obj,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            console.log("POST Request Complete");
        });
    }

    handleSelectedItem(workflow) {
        if (workflow == null){
            alert("You don't have a workflow to complete. Please complete the service request first.");
        }else {
            console.log("Megred Task: "+ JSON.stringify(workflow));
            this.setState({
                workflow: workflow,
                displayDetail: "block",
            });
        }
    }

    render() {
      return (
        <div>
          <div>
            <div className="top-bar show-for-medium small-12 columns">
              <div className="top-bar-left">
                <ul className="menu">
                  <li className="topbar-title">
                     Workflow Detail
                  </li>
                </ul>
              </div>
            </div>
            <div>
                <Detail workflow={this.state.workflow}
                        handleReject={this.handleReject}
                        handleApprove={this.handleApprove} />
            </div>
          </div>
        </div>
      )
    }
}
// end::app[]

module.exports = home;
