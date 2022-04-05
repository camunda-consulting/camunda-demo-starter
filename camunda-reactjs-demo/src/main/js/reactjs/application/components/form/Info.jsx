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
      var item  = null;

      if (this.props.formProps  != null){
          item  =
              <div>
                      <div className="card" >
                          <div className="card-divider text-center">
                              <h4>Form Info</h4>
                          </div>
                          <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                              <ul>
                                  <li><span className="label">Message</span>
                                      <span className="data">{this.props.formProps.message}</span></li>
                                  <li><span className="label">Email</span>
                                      <span className="data">{this.props.formProps.email}</span></li>
                              </ul>
                          </div>
                      </div>
              </div>
      }

      return (
          <div>
              <div className="columns" style={{borderBottom: "0px solid white", padding: "10px"}}></div>
              {item}
              <div className="columns" style={{borderBottom: "0px solid white", padding: "5px"}}></div>
          </div>
      )
  }
  
}
  
module.exports = Info;