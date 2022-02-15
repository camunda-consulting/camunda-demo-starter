/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

const React = require('react');
const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

const ActionBar = require('ActionBar');

class DetailForm extends React.Component {
        
  constructor(props) {
      super(props);
        this.state = {

        };
      this.handleChange = this.handleChange.bind(this);
  }

    handleChange(e){
        e.preventDefault();
        var order = this.props.order;

        order.repName = this.refs.repName.value;
        order.category = this.refs.category.value;
        // order.status = this.refs.status.value;
        order.salesManager = this.refs.salesManager.value;
        order.comment = this.refs.comment.value;
        order.deliveryAddress = this.refs.deliveryAddress.value;

        this.props.onUpdateState(order);

    }

    render() {

        console.log("Detail Form: "+ JSON.stringify(this.props.order));

        var deliveryAddress = "";
        if (this.props.order.deliveryAddress == null){
            deliveryAddress = `${this.props.contact.street}  ${this.props.contact.city}  ${this.props.contact.state}  ${this.props.contact.zip}  ${this.props.contact.country}`
        }else{
            deliveryAddress = this.props.order.deliveryAddress;
        }

        var repName = "";
        if (this.props.order.repName == null){
            repName = `${this.props.contact.first}  ${this.props.contact.last}`
        }else{
            repName = this.props.order.repName;
        }

        var manager = "";
        if (this.props.order.salesManager == null){
            manager = this.props.contact.manager
        }else{
            manager = this.props.order.salesManager;
        }

        return (
          <div>
            <div className="my-form detail-form">

              {/*<div className="small-8 small-offset-2 large-8 large-offset-2 columns">*/}
              <div className="small-12 large-12 small-offset-1 columns" >

                <div className="small-9 large-9">
                    <div className="input-group">
                        <span className="input-group-label">Rep Name</span>
                        <input className="input-group-field" type="text"
                               ref="repName" onChange={this.handleChange}
                               value={repName} />
                    </div>
                </div>

                <div className="small-9 large-9">
                    <div className="input-group">
                        <span className="input-group-label">Sales Manager</span>
                        <input className="input-group-field" type="text"
                               ref="salesManager" onChange={this.handleChange}
                               value={manager} />
                    </div>
                </div>

                <div className="small-9 large-9">
                  <div className="input-group">
                    <span className="input-group-label">Category</span>
                    <select className="input-group-field" ref="category"
                            value={this.props.order.category}
                            onChange={this.handleChange}>

                        <option defaultValue>Choose Catagory</option>
                        <option value="10000">10000 </option>
                        <option value="100000">100000 </option>
                        <option value="250000">250000</option>
                        <option value="500000">500000 </option>
                    </select>
                  </div>
                </div>


                <div className="small-9 large-9">
                  <div className="input-group">
                      <span className="input-group-label"></span>
                      <textarea className="input-group-field"
                                rows="5" ref="deliveryAddress"
                                placeholder="deliveryAddress"
                                onChange={this.handleChange}
                                value={deliveryAddress}/>
                  </div>
                </div>

              <div className="small-9 large-9">
                <div className="input-group">
                    <span className="input-group-label"></span>
                    <textarea className="input-group-field"
                            rows="5" ref="comment"
                            placeholder="Comments"
                            onChange={this.handleChange}
                            value={this.props.order.comment}/>
                </div>
              </div>

              </div>

            </div>

        <ActionBar order={this.props.order}
            post={this.props.post}
           toggleForm={this.props.toggleForm}
           onRedirect={this.props.onRedirect}/>

    </div>
    );
  }
}

module.exports = DetailForm;
