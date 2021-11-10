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

    componentDidMount() {
        console.log("Start Form Component Did Mount");
    }

    componentDidUpdate() {
        console.log("Start Form Component Did Update");
    }

    handleChange(e){
        e.preventDefault();

        var serviceId = this.refs.pid.value;


        console.log("Start Form handleChange: "+ JSON.stringify(serviceId));

        this.props.onUpdateStartState(serviceId);
        this.props.toggleForm("service");
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

                <div className="small-8 small-offset-2 large-8 large-offset-2 columns">
                    <div className="form-registration-group">

                        <a className="form-registration-social-button" href="#" onClick={this.props.onStart}>
                            <i className="fa fa-facebook-official" aria-hidden="true"></i>Start Service Request</a>

                        <select className="form-registration-input"
                                ref="pid"
                                onChange={this.handleChange}
                                value={this.props.serviceRequest.serviceId} >

                          <option defaultValue>Please Select</option>
                          {options}
                        </select>

                        <p className="form-registration-member-signin">Already a member? <a href="#">Sign in</a></p>
                        <p className="form-registration-terms"><a href="#">Terms &amp; Conditions</a>|<a
                            href="#">Privacy</a></p>
                    </div>
                </div>

            </div>

        );
  }
}

module.exports = ServiceStartForm;
