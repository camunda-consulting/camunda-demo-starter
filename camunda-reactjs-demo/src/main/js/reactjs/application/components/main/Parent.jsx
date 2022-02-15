/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');

const Detail = require('UseCaseMain');

// end::vars[]

// tag::app[]
class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          // displayDetail: "block",
          // callUpdate: function (pageSize, that) {that.loadAllFromServer(pageSize)}
        };
        this.handleRedirect = this.handleRedirect.bind(this);

    }

    // tag::follow-1[]
    componentDidMount() {
    }
    // end::follow-1[]

    handleRedirect(path){
        this.props.history.push(path);
    }

    render() {


      return (
          <div>
              <Detail onRedirect={this.handleRedirect} />
          </div>
      )
    }
}
// end::app[]

module.exports = Parent;
