/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');
// tag::customComponents

// tag::vars[]
// end::vars[]

class Line extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
      };
  }

    // tag::follow-1[]
    componentDidMount() {
    }
    // end::follow-1[]



  render() {

      return (
          <tr >
              <td onClick={this.props.onSelectedItem.bind(null, this.props.task)}>{this.props.task.name}</td>
              <td onClick={this.props.onSelectedItem.bind(null, this.props.task)}>{this.props.task.assignee}</td>
              <td onClick={this.props.onSelectedItem.bind(null, this.props.task)}>{this.props.task.created}</td>
              <td onClick={this.props.onSelectedItem.bind(null, this.props.task)}>{this.props.task.due}</td>
              <td onClick={this.props.onSelectedItem.bind(null, this.props.task)}>{this.props.task.delegationState}</td>
              <td onClick={this.props.onSelectedItem.bind(null, this.props.task)}>{this.props.task.priority}</td>
              {/*<td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{this.props.task.serviceId}</td>*/}
          </tr>
      )
  }
}
// end::task[]

module.exports = Line;
