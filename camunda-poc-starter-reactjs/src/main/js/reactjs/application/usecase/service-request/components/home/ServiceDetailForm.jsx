var React = require('react');

const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

const ActionBar = require('src/main/js/reactjs/application/service-request/components/home/ActionBar');

class ServiceDetailForm extends React.Component {
        
  constructor(props) {
      super(props);
        this.state = {

        };
      this.handleChange = this.handleChange.bind(this);
      this.toggleDetailForm = this.toggleDetailForm.bind(this);
  }

    handleChange(e){
        e.preventDefault();
        var serviceRequest = this.props.serviceRequest;
        serviceRequest.serviceOwner = this.refs.serviceOwner.value;
        serviceRequest.sourcingManager = this.refs.sourcingManager.value;
        serviceRequest.acquiringDivision = this.refs.acquiringDivision.value;
        serviceRequest.sourcingComments = this.refs.sourcingComments.value;

        this.props.onUpdateState(serviceRequest);

    }

    toggleDetailForm(){
      this.props.toggleForm("supplier");
    }

    render() {

        console.log("Service Detail  Form: "+ JSON.stringify(this.props.serviceRequest));


        return (
        <div>
            <div className="my-form">

                <div className="small-7 small-offset-2 large-7 large-offset-2 columns">
                    <div className="input-group">
                        <span className="input-group-label">Service Owner</span>
                        <input className="input-group-field" type="text"
                               ref="serviceOwner" onChange={this.handleChange}
                               value={this.props.serviceRequest.serviceOwner} />
                    </div>
                </div>

                <div className="small-7 small-offset-2 large-7 large-offset-2 columns">
                    <div className="input-group">
                        <span className="input-group-label">Sourcing Manager</span>
                        <input className="input-group-field" type="text"
                               ref="sourcingManager" onChange={this.handleChange}
                               value={this.props.serviceRequest.sourcingManager}/>
                    </div>
                </div>

                <div className="small-7 small-offset-2 large-7 large-offset-2 columns">
                  <div className="input-group">
                    <span className="input-group-label">Acquiring Division</span>
                    <select className="input-group-field" ref="acquiringDivision"
                            value={this.props.serviceRequest.acquiringDivision}
                            onChange={this.handleChange}>

                        <option defaultValue>Choose Division</option>
                        <option value="1">Division 1 </option>
                        <option value="2">Division 2 </option>
                        <option value="3">Division 3 </option>
                        <option value="5">Division 4 </option>
                    </select>
                  </div>
                </div>

              <div className="row">
                  <div className="small-7 small-offset-2 large-7 large-offset-2 columns">
                  <textarea rows="5" ref="sourcingComments"
                            placeholder="Sourcing Comments"
                            onChange={this.handleChange}
                            value={this.props.serviceRequest.sourcingComments}/>
                  </div>
              </div>
        </div>
        <ActionBar serviceRequest={this.props.serviceRequest}
                   post={this.props.post}
                   toggleForm={this.toggleDetailForm}
                   onRedirect={this.props.onRedirect}/>

      </div>

    );
  }
}

module.exports = ServiceDetailForm;
