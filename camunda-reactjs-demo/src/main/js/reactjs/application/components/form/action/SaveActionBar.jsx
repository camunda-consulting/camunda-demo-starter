const React = require('react');

// tag::vars[]
const apiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}:${process.env.DATA_API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class SaveActionBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(e){
        e.preventDefault();
        console.log("SaveActionBar -> HandleSave: " + JSON.stringify(this.props.submission));
        //post the object to the endpoint
        this.props.post("PATCH", this.props.submission, apiRoot+`/cases/${this.props.submission.id}`);
        this.props.toggleForm("confirm");
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

module.exports = SaveActionBar;
