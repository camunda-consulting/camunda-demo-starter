const React = require('react');

// tag::vars[]
const dataApiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}` : "/";
const dataApi = `${dataApiHost}:${process.env.DATA_API_PORT}`;
const dataApiUri = `${dataApi}/${process.env.DATA_API_ROOT}`;

// end::vars[]

class Action extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleConfirm = this.handleConfirm.bind(this);
    }


    handleConfirm(e){
        e.preventDefault();

        this.props.onConfirm();
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

module.exports = Action;
