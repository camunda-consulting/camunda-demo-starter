/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
const Form = require('TaskForm');
const Info = require('TaskInfo');

// tag::vars[]
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
        {/*<Form task={this.props.task}*/}
        {/*      handleReject={this.props.handleReject}*/}
        {/*      handleApprove={this.props.handleApprove}/>*/}
      </div>
    )
  }
}

module.exports = Detail;
