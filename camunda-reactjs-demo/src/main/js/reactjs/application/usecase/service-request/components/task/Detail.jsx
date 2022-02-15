/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');
const ReactDOM = require('react-dom')
const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

// tag::customComponents
const Form = require('src/main/js/reactjs/application/service-request/components/task/Form.jsx');
const Info = require('src/main/js/reactjs/application/service-request/components/task/Info.jsx');

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class Detail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render(){

    return (
      <div>

        <Info task={this.props.task} />
        <Form task={this.props.task}
              handleReject={this.props.handleReject}
              handleApprove={this.props.handleApprove}/>
      </div>
    )
  }
}

module.exports = Detail;
