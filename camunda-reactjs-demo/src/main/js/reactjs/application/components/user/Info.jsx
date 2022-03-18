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
      let item  = null;
      let address = `${this.props.user.street}  ${this.props.user.city}  ${this.props.user.state}  ${this.props.user.zip}  ${this.props.user.country}`;
      if (this.props.item  != null){
          item  =
              <div>
                  <div className="small-5 columns" >
                      <div className="card" >
                          <div className="card-divider text-center">
                              <h4>User Info</h4>
                          </div>
                          <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                              <ul>
                                  <li><span className="label">First Name</span>
                                      <span className="data">{this.props.user.first} </span></li>
                                  <li><span className="label">Last Name</span>
                                      <span className="data">{this.props.user.last} </span></li>
                                  <li><span className="label">Email</span>
                                      <span className="data">{this.props.user.email}</span></li>
                                  <li><span className="label">Phone</span>
                                      <span className="data">{this.props.user.phone}</span></li>
                                  <li><span className="label">Address</span>
                                      <span className="data">{address}</span></li>
                              </ul>
                          </div>
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