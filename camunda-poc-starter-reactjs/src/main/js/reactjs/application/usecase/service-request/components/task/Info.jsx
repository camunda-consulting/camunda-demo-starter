/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
const DisplayDate = require('src/main/js/reactjs/application/service-request/components/date/DisplayDate.jsx');
// tag::vars[]


class Info extends React.Component{
  constructor(props) {
      super(props);
      // this.handleDelete = this.handleDelete.bind(this);
  }

  // handleDelete(e){
  //     e.preventDefault;
  //     alert("Sure you want to delete this property? Press the [esc] button to cancel this action.");
  //     this.props.onDelete(this.props.task);
  // }
  
  render(){
      return (
          <div className="my-form">
            <div className="row">

              <div className="small-5 small-offset-1 columns">
                <div className="card" >
                  <div className="card-divider text-center">
                    <h4>Task Info</h4>
                  </div>
                  <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                    <ul>
                      <li><span className="label">Task name</span><span className="data">{this.props.task.name}</span></li>
                      <li><span className="label">Task Id</span><span className="data">{this.props.task.id}</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="small-5 columns">
                <div className="card" style={{width: "400px"}}>
                  <div className="card-divider text-center">
                    <h4>Service Owner</h4>
                  </div>
                  <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                      <ul>
                          <li><span className="label">Service Owner</span><span className="data">{this.props.task.serviceRequest.serviceOwner}</span></li>
                      </ul>
                  </div>
                </div>
              </div>

              {/*<div className="small-4 columns">*/}
              {/*  <div className="card" style={{width: "300px"}}>*/}
              {/*      <a className="button small float-right" key="last" onClick={this.handleDelete}>Delete</a>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
        
            <div className="row">
              <div className="small-5 small-offset-1 columns" >
                <div className="card" >
                  <div className="card-divider text-center">
                    <h4>Status</h4>
                  </div>
                  <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                    <ul>
                      <li><span className="label">Assigned Date</span><span className="data">{this.props.task.serviceRequest.acquiringDivision} </span></li>
                        <li><span className="label">Due Date</span><span className="data">{this.props.task.serviceRequest.serviceDescription} </span></li>
                      <li><span className="label">RAG Status</span><span className="data">{this.props.task.serviceRequest.sourcingManager}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="small-5  columns">
                <div className="card" style={{width: "400px"}}>
                  <div className="card-divider text-center">
                    <h4>Service Info</h4>
                  </div>
                  <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                    <ul>
                      <li><span className="label">Service ID</span><span className="data">{this.props.task.serviceRequest.serviceId}</span></li>
                      <li><span className="label">Service Category</span><span className="data">{this.props.task.serviceRequest.serviceCategory}</span></li>
                      <li><span className="label">Sourcing Comments</span><span className="data">{this.props.task.serviceRequest.sourcingComments}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )                 
  }
  
}
  
module.exports = Info;