const React = require('react');

// tag::vars[]
const dataApiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}` : "/";
const dataApi = `${dataApiHost}:${process.env.DATA_API_PORT}`;
const dataApiUri = `${dataApi}/${process.env.DATA_API_ROOT}`;

// end::vars[]

class ConfirmActionBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel(e){
        e.preventDefault();

        var obj = this.props.submission;

        console.log("ConfirmationForm -> ConfirmActionBar -> handleCancel: " + JSON.stringify(obj));
        //post the object to the endpoint

        let data = {};
        data.workflowKey = [];
        let taskCount = 0;
        if (this.props.submission.inspection == true) {
            data.workflowKey.push ( "Message_cancel-inspection" );
            data.businessKey = obj.businessKey;
        }

        if (this.props.submission.lotRelease == true) {
            data.workflowKey.push( "Message_cancel-lot-release" );
            data.businessKey = obj.businessKey;
        }

        if (this.props.submission.inSupport == true) {
            data.workflowKey.push( "Message_cancel-support-testing" );
            data.businessKey = obj.businessKey;
        }

        this.props.post('POST', data, `${dataApi}/workflow/correlate/message`);

        this.props.toggleForm("confirmed");

    }


    handleConfirm(e){
        e.preventDefault();

        var obj = this.props.submission;

        console.log("ConfirmationForm -> ConfirmActionBar -> handleConfirm: " + JSON.stringify(obj));
        //post the object to the endpoint

        let data = {};
        data.workflowKey = [];

        let taskCount = 0;
        if (this.props.submission.taskCount != null
            && this.props.submission.taskCount != undefined)
        {
            taskCount = this.props.submission.taskCount
        }

        if (this.props.submission.started == false) {
            data.workflowKey.push( "Message_start-discipline-review" );
            data.businessKey = obj.businessKey;
        }

        if (this.props.submission.inspection == true) {
            taskCount = taskCount + 1;
            data.workflowKey.push ( "Message_start-inspection" );
            data.businessKey = obj.businessKey;
            data.processVariables = {"taskCount" :  { "value": taskCount, "type": "Integer"}}
        }

        if (this.props.submission.lotRelease == true) {
            taskCount = taskCount + 1;
            data.workflowKey.push( "Message_start-lot-release" );
            data.businessKey = obj.businessKey;
            data.processVariables = {"taskCount" :  { "value": taskCount, "type": "Integer"}}
        }

        if (this.props.submission.inSupport == true) {
            taskCount = taskCount + 1;
            data.workflowKey.push( "Message_start-support-testing" );
            data.businessKey = obj.businessKey;
            data.processVariables = {"taskCount" :  { "value": taskCount, "type": "Integer"}}
        }

        this.props.post('POST', data, `${dataApi}/workflow/start`);

        this.props.toggleForm("confirmed");

    }

  render(){

    return (
        <div className="top-bar">
            <div className="top-bar-right columns">
                <ul className="menu my-bar">
                    <li>
                        <a className="button small my-button" key="confirm" onClick={this.handleCancel}>Cancel</a>
                    </li>
                    <li>
                        <a className="button small my-button" key="confirm" onClick={this.handleConfirm}>Start</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = ConfirmActionBar;
