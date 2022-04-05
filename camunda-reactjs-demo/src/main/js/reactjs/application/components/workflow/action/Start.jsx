/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}|React}
 */
const React = require('react');

// tag::vars[]
// end::vars[]

class Start extends React.Component{

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
                        <a className="button small my-button" key="start" onClick={this.props.onStart}>Start</a>
                    </li>
                </ul>
            </div>
        </div>
    )
  }
}

module.exports = Start;
