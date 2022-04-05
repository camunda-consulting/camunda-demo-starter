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
const WorkflowInfo = require('WorkflowInfo');
// tag::customComponents

// tag::vars[]
const apiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}:${process.env.PALTFORM_API_PORT}/${process.env.PLATFORM_API_ROOT}` : "/engine-rest";
const workflowContext = process.env.WORKFLOW_CONTEXT_PATH != "" ? `${process.env.WORKFLOW_CONTEXT_PATH}` : "process-instance";
const uri = apiHost+"/"+workflowContext
// end::vars[]

// tag::app[]
class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workflow: null,
            displayDetail: "block",
            displayInfo: "block",
            toggleDetailInfo: "off",
            callUpdate: function (key, that) {that.loadOneFromServer(key)}
        };
        this.post = this.post.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit(){

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
                <div className="small-8 small-offset-2 columns">
                   <WorkflowInfo workflow={this.state.workflow}/>
                </div>
            </div>
          </div>
        </div>
      )
    }
}
// end::app[]

module.exports = main;
