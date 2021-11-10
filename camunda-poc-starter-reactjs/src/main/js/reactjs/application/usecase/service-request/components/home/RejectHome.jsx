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

const RejectDetail = require('src/main/js/reactjs/application/service-request/components/home/RejectDetail.jsx');

// end::vars[]

// tag::app[]
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          displayDetail: "block",
          callUpdate: function (pageSize, that) {that.loadAllFromServer(pageSize)}
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

                <div className="top-bar show-for-medium small-12 columns">
                   <div className="top-bar-left">
                     <ul className="menu">
                       <li className="topbar-title">
                         Rejected Service Requests
                       </li>
                     </ul>
                   </div>
                </div>

                <div>
                  <RejectDetail onRedirect={this.handleRedirect}/>
              </div>

          </div>
      )
    }
}
// end::app[]

module.exports = Home;
