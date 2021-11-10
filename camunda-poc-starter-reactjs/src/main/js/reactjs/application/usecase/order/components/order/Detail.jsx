/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
// const Form = require('OrderForm');
const Info = require('OrderInfo');

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

        {/*<Form task={this.props.task}*/}
        {/*      handleReject={this.props.handleReject}*/}
        {/*      handleApprove={this.props.handleApprove}*/}
        {/*      handleClaim={this.props.handleClaim}*/}
        {/*      handleMoreInfo={this.props.handleMoreInfo}/>*/}
      </div>
    )
  }
}

module.exports = Detail;
