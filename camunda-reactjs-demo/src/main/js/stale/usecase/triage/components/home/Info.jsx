/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
// tag::vars[]


class Info extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
      console.log("INFO Service Request: "+ JSON.stringify(this.props.item ));
      var item  = null;
      if (this.props.item  != null){
          item  =
              <div>
                  <div className="small-5 small-offset-1 columns" >
                      <div className="card" >
                          <div className="card-divider text-center">
                              <h4>Status</h4>
                          </div>
                          <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                              <ul>
                                  <li><span className="label">Aquiring Division</span>
                                      <span className="data">{this.props.item.acquiringDivision} </span></li>
                                  <li><span className="label">Service Description</span>
                                      <span className="data">{this.props.item.serviceDescription} </span></li>
                                  <li><span className="label">RAG Status</span>
                                      <span className="data">{this.props.item.sourcingManager}</span></li>
                                  <li><span className="label">Service Owner</span>
                                      <span className="data">{this.props.item.serviceOwner}</span></li>
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
                                  <li><span className="label">Service ID</span>
                                      <span className="data">{this.props.item.serviceId}</span></li>
                                  <li><span className="label">Service Category</span>
                                      <span className="data">{this.props.item.serviceCategory}</span></li>
                                  <li><span className="label">Sourcing Comments</span>
                                      <span className="data">{this.props.item.sourcingComments}</span></li>
                                  <li><span className="label">Supplier</span>
                                      <span className="data">{this.props.item.buContractingService}</span></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
      }

      return (
          <div>
              {item}
          </div>
      )
  }
  
}
  
module.exports = Info;