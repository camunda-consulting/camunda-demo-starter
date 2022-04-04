/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
const Form = require('ItemForm');
const Info = require('ItemInfo');


class Detail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render(){

    return (
      <div className="my-form item-form">

        <Info item={this.props.item} />

        <Form item={this.props.item} />

      </div>
    )
  }
}

module.exports = Detail;
