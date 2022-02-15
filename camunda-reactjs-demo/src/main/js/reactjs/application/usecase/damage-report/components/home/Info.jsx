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

      // var deliveryAddress = "";
      var employeeAddress = `${this.props.contact.street}  ${this.props.contact.city}  ${this.props.contact.state}  ${this.props.contact.zip}  ${this.props.contact.country}`;
      // if (this.props.item.deliveryAddress == null){
      //     deliveryAddress = employeeAddress;
      // }else{
      //     deliveryAddress = this.props.item.deliveryAddress;
      // }
      //
      // var repName = "";
      // if (this.props.item.repName == null){
      //     repName = `${this.props.contact.first}  ${this.props.contact.last}`
      // }else{
      //     repName = this.props.item.repName;
      // }
      //
      // var manager = "";
      // if (this.props.item.salesManager == null){
      //     manager = this.props.contact.manager
      // }else{
      //     manager = this.props.item.salesManager;
      // }

      if (this.props.item  != null){
          item  =
              <div>
                  <div className="small-5 columns" >
                      <div className="card" >
                          <div className="card-divider text-center">
                              <h4>Personal Info</h4>
                          </div>
                          <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                              <ul>
                                  <li><span className="label">First Name</span>
                                      <span className="data">{this.props.contact.first} </span></li>
                                  <li><span className="label">Last Name</span>
                                      <span className="data">{this.props.contact.last} </span></li>
                                  <li><span className="label">Email</span>
                                      <span className="data">{this.props.contact.email}</span></li>
                                  <li><span className="label">Phone</span>
                                      <span className="data">{this.props.contact.phone}</span></li>
                                  <li><span className="label">Address</span>
                                      <span className="data">{employeeAddress}</span></li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className="small-6  columns">
                      <div className="card" >
                          <div className="card-divider text-center">
                              <h4>Damage Info</h4>
                          </div>
                          <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                              <ul>
                                  <li><span className="label">Case Id</span>
                                      <span className="data">{this.props.item.damageKey}</span></li>
                                  <li><span className="label">License Plate</span>
                                      <span className="data">{this.props.item.licensePlate}</span></li>
                                  <li><span className="label">Responsible for accident</span>
                                      <span className="data">{this.props.item.responsible}</span></li>
                                  <li><span className="label">Counter Party</span>
                                      <span className="data">{this.props.item.counterParty}</span></li>
                                  <li><span className="label">Type of Damage</span>
                                      <span className="data">{this.props.item.damageType}</span></li>
                                  <li><span className="label">Location of Accident</span>
                                      <span className="data">{this.props.item.location}</span></li>
                                  <li><span className="label">Accident Timing</span>
                                      <span className="data">{this.props.item.timing}</span></li>
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