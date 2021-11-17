/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
var React = require('react');

// tag::customComponents

// tag::vars[]
// end::vars[]

class Form extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return (
      <div className="top-bar">
          <div className="top-bar-right columns">
              <ul className="menu my-bar">
                  <li>
                      <a className="button small my-button" key="service" onClick={this.props.handleReject}>Reject</a>
                  </li>
                  <li>
                      <a className="button small my-button" key="service" onClick={this.props.handleApprove}>Approve</a>
                  </li>
              </ul>
          </div>
      </div>
    );
  }
}

module.exports = Form;
