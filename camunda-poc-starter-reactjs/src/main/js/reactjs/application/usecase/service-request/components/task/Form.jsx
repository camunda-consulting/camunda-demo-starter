/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
var React = require('react');
const client = require('../client.jsx');

// tag::customComponents
const DisplayDate = require('src/main/js/reactjs/application/service-request/components/date/DisplayDate.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
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
