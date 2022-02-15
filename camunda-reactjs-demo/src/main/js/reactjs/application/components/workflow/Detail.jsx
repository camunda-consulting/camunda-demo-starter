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

      // var info = "";
      //
      // if (this.props.workflow != null) {
      //     console.log("Info Render: "+JSON.stringify(this.props.workflow));
      //
      //     info =  <Info workflow={this.props.workflow} />
      // }else {
      //     info =  <div className="my-form">
      //               <div className="row">
      //                 <div className="small-5 small-offset-1 columns">
      //                   <h4>No workflow found!</h4>
      //                   <p>Select tasks a accompanying workflow will be started</p>
      //                 </div>
      //               </div>
      //             </div>
      // }

      return (
      <div>
          <Info workflow={this.props.workflow} />
        {/*<Form task={this.props.task}*/}
        {/*      handleReject={this.props.handleReject}*/}
        {/*      handleApprove={this.props.handleApprove}/>*/}
      </div>
    )
  }
}

module.exports = Detail;
