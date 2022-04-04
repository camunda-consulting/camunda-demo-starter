const React = require('react');

// tag::vars[]
const dataApiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}` : "/";
const dataApi = `${dataApiHost}:${process.env.DATA_API_PORT}`;
const dataApiUri = `${dataApi}/${process.env.DATA_API_ROOT}`;

// end::vars[]

class ActionBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleConfirm = this.handleConfirm.bind(this);
    }


    handleConfirm(e){
        e.preventDefault();

        var obj = this.props.order;

        console.log("Order -> ActionBar -> handleConfirm: " + JSON.stringify(obj));
        //post the object to the endpoint
        this.props.post("PATCH", {started: true}, `${dataApiUri}/orders/${obj.id}`)
        this.props.post('POST', {"workflowKey" : "start-pm-order-approval", "businessKey" : obj.orderKey }, `${dataApi}/workflow/start`);

        this.props.toggleConfirm();

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

module.exports = ActionBar;
