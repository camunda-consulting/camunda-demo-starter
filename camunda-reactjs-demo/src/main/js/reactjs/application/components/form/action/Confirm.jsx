const React = require('react');

// tag::vars[]
// end::vars[]

class Confirm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel(e){
        e.preventDefault();

        console.log("ConfirmAction -> handleCancel: ");

        this.props.toggleForm("cancel");
    }

    handleConfirm(e){
        e.preventDefault();

        console.log("ConfirmAction -> handleConfirm: ");

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
                        <a className="button small my-button" key="confirm" onClick={this.handleConfirm}>Confirm</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = Confirm;
