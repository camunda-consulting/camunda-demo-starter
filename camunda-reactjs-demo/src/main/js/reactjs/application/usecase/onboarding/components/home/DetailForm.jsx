/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

const React = require('react');
const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

// import {Form} from '@formio/react';
const {Form} = require('react-formio');

const ActionBar = require('src/main/js/reactjs/application/usecase/onboarding/components/home/ActionBar');

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
          <div className="small-12 large-12 columns my-formio">
              <div className="small-8 large-8 small-offset-2 columns">
                <div className="my-form detail-form">
                      <Form src="https://lwuepgfpqgpjcxs.form.io/onboarding" onSubmit={console.log} />
                </div>
              </div>

            {/*<ActionBar order={this.props.order}*/}
            {/*    post={this.props.post}*/}
            {/*    toggleForm={this.props.toggleForm}*/}
            {/*    onRedirect={this.props.onRedirect}/>*/}

          </div>
    );
  }
}

module.exports = DetailForm;
