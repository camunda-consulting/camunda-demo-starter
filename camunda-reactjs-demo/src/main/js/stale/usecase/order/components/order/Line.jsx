/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
// end::customComponents

// tag::vars[]
// end::vars[]

class Line extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        task: null
      };
  }

    render() {

      return (
          <tr className="my-line">
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.product}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.pmiCode}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.pmiDescription}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.coPolicyNo}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.quantity}</td>
          </tr>
      )
  }
}
// end::task[]

module.exports = Line;
