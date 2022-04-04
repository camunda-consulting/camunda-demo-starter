const React = require('react');

// tag::vars[]
// end::vars[]

class Save extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render(){

    return (
        <div className="top-bar">
            <div className="top-bar-right columns">
                <ul className="menu my-bar">
                    <li>
                        <a className="button small my-button" key="service" onClick={this.props.onSave}>Save</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = Save;
