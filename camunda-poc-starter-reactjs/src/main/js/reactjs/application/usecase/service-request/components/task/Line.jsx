/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
var {Link, IndexLink} = require('react-router');
const client = require('../client.jsx');
const React = require('react');

// tag::customComponents
const DisplayDate = require('src/main/js/reactjs/application/service-request/components/date/DisplayDate.jsx');
const UpdateNoteDialog = require('src/main/js/reactjs/application/components/note/UpdateNoteDialog.jsx');

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class Line extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        task: null
      };
      this.loadTaskFromServer = this.loadTaskFromServer.bind(this);
  }

    // tag::follow-1[]
    componentDidMount() {
        this.loadTaskFromServer(this.props.task.serviceId);
    }
    // end::follow-1[]

  loadTaskFromServer(businessKey){
    client({
        method: 'GET',
        path: apiHost+"engine-rest/task",
        params: {processInstanceBusinessKey: businessKey},
        headers: {'Accept': 'application/json'}
    }).done(response => {
        this.setState({
            task: response.entity[0]
        });
    });
  }

  render() {

      var task = this.state.task;
      var name = "";
      if (task != null){
          name = task.name;
      }

      return (
          <tr >
              <td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{name}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{this.props.task.serviceOwner}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{this.props.task.sourcingManager}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{this.props.task.serviceDescription}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{this.props.task.acquiringDivision}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{this.props.task.serviceCategory}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{this.props.task.sourcingComments}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.task, this.state.task)}>{this.props.task.serviceId}</td>
          </tr>
      )
  }
}
// end::task[]

module.exports = Line;
