/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}|React}
 */

const React = require('react');

// tag::vars[]
const dataApiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}` : "/";
const dataApi = `${dataApiHost}:${process.env.DATA_API_PORT}`;
const dataApiUri = `${dataApi}/${process.env.DATA_API_ROOT}`;

// end::vars[]

class ActionBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("WorkflowActionBar -> handleConfirm: Submission Obj" + JSON.stringify(this.props.submission));
        //post the object to the endpoint
        console.log("WorkflowActionBar -> handleConfirm: Workflow Obj: " + JSON.stringify(this.props.workflow));

        let data = {};
        data.workflowKey = this.props.workflow.correlationMessage;
        data.businessKey = this.props.submission.key;
        let readingVal = {systolic: this.props.reading.systolic, diastolic: this.props.reading.diastolic, readingTime: "2021-05-13T00:00:00.000Z" };
        data.processVariables = {
            reading: {
                value: JSON.stringify(readingVal),
                type: "Json"
            }
        };
        this.props.post('POST', data, `${dataApi}/workflow/message/start`);
        this.props.toggleForm("confirmed");
    }

  render(){

    return (
        <div className="top-bar">
            <div className="top-bar-right columns">
                <ul className="menu my-bar">
                    {/*<li>*/}
                    {/*    <a className="button small my-button" key="confirm" onClick={this.handleCancel}>Cancel</a>*/}
                    {/*</li>*/}
                    <li>
                        <a className="button small my-button" key="confirm" onClick={this.handleSubmit}>Start</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = ActionBar;
