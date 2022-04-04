/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

const Detail = require('src/main/js/reactjs/application/usecase/onboarding/components/home/Detail');

// end::vars[]

// tag::app[]
class Home extends React.Component {

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

module.exports = Home;
