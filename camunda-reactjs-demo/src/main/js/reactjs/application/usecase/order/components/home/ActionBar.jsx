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
    }

    handleSave(e){
        e.preventDefault();
        console.log("HOME -> ActionBar -> HandleSave: " + JSON.stringify(this.props.order));
        //post the object to the endpoint
        this.props.post("PATCH", this.props.order, apiRoot+`/orders/${this.props.order.id}`);

        this.props.toggleForm("items");
    }

  render(){

    return (
        <div className="top-bar">
            <div className="top-bar-right columns">
                <ul className="menu my-bar">
                    <li>
                        <a className="button small my-button" key="service" onClick={this.handleSave}>Save</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = ActionBar;
