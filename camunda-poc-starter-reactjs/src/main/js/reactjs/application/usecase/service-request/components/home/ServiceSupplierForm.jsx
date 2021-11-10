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
      this.toggleForm = this.toggleForm.bind(this);
  }

    handleChange(e){
        e.preventDefault();
        var serviceRequest = this.props.serviceRequest;
        console.log("handleChange: "+ serviceRequest)
        serviceRequest.buContractingService = this.refs.buContractingService.value;

        this.props.onUpdateState(serviceRequest);

    }


    toggleForm(){
        this.props.toggleForm("supplier");
    }

  render() {

    return (
    <div>
      <div className="my-form">
        <div className="small-7 small-offset-2 large-7 large-offset-2 columns">
            <div className="input-group">
                <span className="input-group-label">Supplier</span>
                <input className="input-group-field" type="text" ref="buContractingService"
                       onChange={this.handleChange}
                       value={this.props.serviceRequest.buContractingService} />
            </div>
        </div>
      </div>
        <ActionBar serviceRequest={this.props.serviceRequest}
                   post={this.props.post}
                   toggleForm={this.toggleForm}
                   onRedirect={this.props.onRedirect}/>
    </div>
    );
  }
}

module.exports = ServiceForm;
