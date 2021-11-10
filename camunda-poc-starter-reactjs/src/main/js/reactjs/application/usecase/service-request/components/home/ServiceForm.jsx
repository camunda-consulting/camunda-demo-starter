var React = require('react');
const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

const ActionBar = require('src/main/js/reactjs/application/service-request/components/home/ActionBar');

class ServiceForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleServiceForm = this.toggleServiceForm.bind(this);

    }

    handleChange(e){
        e.preventDefault();
        var serviceRequest = this.props.serviceRequest;
        serviceRequest.serviceCategory = this.refs.serviceCategory.value;
        serviceRequest.serviceDescription = this.refs.serviceDescription.value;

        console.log("handleChange: "+ JSON.stringify(serviceRequest));

        this.props.onUpdateState(serviceRequest);

    }

    toggleServiceForm(){
        this.props.toggleForm("detail");
    }

    render() {

        console.log("Service Form: "+ JSON.stringify(this.props.serviceRequest));

    return (

        <div>
            <div className="my-form">
                <div className="small-7 small-offset-2 large-7 large-offset-2 columns">
                  <div className="input-group">
                        <span className="input-group-label">Service Category</span>

                        <select className="input-group-field"
                                ref="serviceCategory"
                                onChange={this.handleChange}
                                value={this.props.serviceRequest.serviceCategory}>

                            <option defaultValue>Choose Category</option>
                            <option value="1">Category 1 </option>
                            <option value="2">Category 2 </option>
                            <option value="3">Category 3 </option>
                            <option value="5">Category 5 </option>
                        </select>

                  </div>
                </div>

                <div className="row">
                    <div className="small-7 small-offset-2 large-7 large-offset-2 columns">
                        <div className="input-group">
                            <textarea rows="5" ref="serviceDescription"
                                placeholder="Service Description"
                                onChange={this.handleChange}
                                value={this.props.serviceRequest.serviceDescription}/>
                        </div>
                    </div>
                </div>

            </div>

            <ActionBar serviceRequest={this.props.serviceRequest}
                       post={this.props.post}
                       toggleForm={this.toggleServiceForm}
                       onRedirect={this.props.onRedirect}/>
        </div>

    );
  }
}

module.exports = ServiceForm;
