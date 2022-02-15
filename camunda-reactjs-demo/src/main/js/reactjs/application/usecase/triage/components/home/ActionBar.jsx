const React = require('react');

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class ActionBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleSave(e){
        e.preventDefault();
        console.log("HOME -> ActionBar -> HandleSave: " + JSON.stringify(this.props.serviceRequest));
        //post the object to the endpoint
        // this.props.post("PATCH", this.props.order, apiRoot+`/pmOrders/${this.props.order.id}`);
        this.props.post(this.props.serviceRequest, "sr/save");
        this.props.toggleForm();
    }

    handleDone(e){
        e.preventDefault();

        var serviceRequest = this.props.serviceRequest;

        serviceRequest.started = true;

        console.log("HandleDone: " + JSON.stringify(serviceRequest));
        //post the object to the endpoint to save the Service Request
        this.props.post(serviceRequest, "sr/save");

        //post the object to the endpoint to Start the workflow
        this.props.post(serviceRequest, "sr/start/workflow");

        this.props.onRedirect("/tasks")

    }

  render(){

    return (
        <div className="top-bar">
            <div className="top-bar-right columns">
                <ul className="menu my-bar">
                    <li>
                        <a className="button small my-button" key="service" onClick={this.handleSave}>Save</a>
                    </li>
                    <li>
                        <a className="button small my-button" key="service" onClick={this.handleDone}>Complete</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = ActionBar;
