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
    }


    handleConfirm(e){
        e.preventDefault();

        var obj = this.props.submission;

        console.log("ConfirmationForm -> ConfirmActionBar -> handleConfirm: " + JSON.stringify(obj));
        //post the object to the endpoint
        this.props.post('POST', {"workflowKey" : "Message_damage-report", "damageKey" : obj.damageKey }, `${dataApi}/workflow/start/async`);

        this.props.toggleForm("confirmed");

    }

  render(){

    return (
        <div className="top-bar">
            <div className="top-bar-right columns">
                <ul className="menu my-bar">
                    <li>
                        <a className="button small my-button" key="confirm" onClick={this.handleConfirm}>Confirm</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = ConfirmActionBar;
