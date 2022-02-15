var React = require('react');
const client = require('../client.jsx');
const DisplayDate = require('src/main/js/reactjs/application/service-request/components/date/DisplayDate.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

class ServiceStartForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        e.preventDefault();

        var serviceRequest = this.refs.pid.value;

        console.log("Service Select Form handleChange: "+ JSON.stringify(serviceRequest));

        this.props.onUpdateStartState(serviceRequest);
    }

    render() {

        if (this.props.serviceRequests !== null){
            // console.log("Start FORM SR's: "+ JSON.stringify(this.props.serviceRequests));
            var options = this.props.serviceRequests.map(serviceRequest =>
                // console.log("Start FORM SR's: "+ JSON.stringify(serviceRequest) +" :: "+serviceRequest._links.self.href)
                <option key={serviceRequest._links.self.href} value={serviceRequest.serviceId}>{serviceRequest.serviceId}</option>
            );
        }

        return (
            <div className="my-form">

                <div className="small-7 large-7 columns">
                  <div className="input-group">

                      <span className="input-group-label">Select Existing Service Request</span>
                      <select className="input-group-field"
                            ref="pid"
                            onChange={this.handleChange} >

                          <option defaultValue>Please Select</option>
                          {options}
                      </select>
                  </div>
                </div>

            </div>

        );
  }
}

module.exports = ServiceStartForm;
