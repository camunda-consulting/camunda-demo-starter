/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
var React = require('react');
const client = require('../client.jsx');

// tag::customComponents
const DisplayDate = require('src/main/js/reactjs/application/components/date/DisplayDate.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class Form extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onClaim = this.onClaim.bind(this)
    this.onMoreInfo = this.onMoreInfo.bind(this)
  }

  onClaim(e) {
      e.preventDefault();
      this.props.handleClaim(this.props.task.id);
  }

  onMoreInfo(e) {
      e.preventDefault();
      console.log("onMoreINfo")
      this.props.handleMoreInfo(this.props.task.serviceRequest.serviceId);
  }


  render() {

    return (
        <div className="top-bar my-bar">

        <div className="row">
              <div className="small-6 small-offset-6 columns">
                {/*<form onSubmit={this.handleSubmit}>*/}

                    <div className="small-12 columns ">
                        <div className="small-2 large-2 columns">
                            {/*<label htmlFor="claim" className="button small">Claim</label>*/}
                            <a id="claim" className="button small my-button" onClick={this.onClaim}>Claim </a>
                        </div>
                        {/*  Buttons for handling save and starting the service request  */}
                        <div className="small-2 large-2 columns ">
                            {/*<label htmlFor="reject" className="button small" >Reject</label>*/}
                            <a id="reject" className="button small my-button" onClick={this.props.handleReject} >Reject</a>
                        </div>

                        <div className="small-2 large-2 columns ">
                            {/*<label htmlFor="moreInfo" className="button small" >Request Info</label>*/}
                            <a id="moreInfo" className="button small my-button" onClick={this.onMoreInfo} >Request Info</a>
                        </div>

                        <div className="small-2 large-2 columns">
                            {/*<label htmlFor="approve" className="button small">Approve</label>*/}
                            <a id="approve" className="button small my-button" onClick={this.props.handleApprove} >Approve</a>
                        </div>
                    </div>

                {/*</form>*/}
              </div>
          </div>

      </div>
    );
  }
}

module.exports = Form;
