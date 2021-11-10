/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
import React, { Component } from 'react';
const client = require('client');
const follow = require('follow'); // function to hop multiple links by "rel"

// tag::customComponents
const Detail = require('TaskDetail');
const Info =  require('TaskInfo');
const Confirmation =  require('TaskConfirmation');
const Form =  require('TaskForm');
const Action = require('TaskAction');

// tag::customComponents

// tag::vars[]
const dataApiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}` : "/";
const dataApi = `${dataApiHost}:${process.env.DATA_API_PORT}`;
const dataApiUri = `${dataApi}/${process.env.DATA_API_ROOT}`;

// end::vars[]

// tag::app[]
class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            attributes: [],
            pageSize: 10,
            links: {},
            displayDetail: "none",
            displayInfo: "none",
            displayConfirmation: "none",
            displayForm: "block"
        };
        this.post = this.post.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.toggleInfo = this.toggleInfo.bind(this);
        this.toggleDetail = this.toggleDetail.bind(this);
        this.handleUpdateState = this.handleUpdateState.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    // tag::update-page-size[]
    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
          this.state.callUpdate(pageSize, this);
        }
    }
    // end::update-page-size[]

    // tag::follow-1[]
    componentDidMount() {
        console.log("Home -> ComponentDidMount -> Param: "+JSON.stringify(this.props.params));
        this.loadItem(this.props.params.key);
    }
    // end::follow-1[]

    handleConfirm(){
        var obj = this.state.item;

        console.log("Home -> handleConfirm: " + JSON.stringify(obj));
        //post the object to the endpoint
        this.post('PATCH', {"status" : obj.status}, `${dataApiUri}/damageReports/${obj.id}`);

        this.post('POST', {"workflowKey" : "Message_work-order-validation", "businessKey" : obj.damageKey }, `${dataApi}/workflow/correlate/message`);

        this.toggleConfirm();
    }

    handleUpdateState(target){
        console.log("Detail => handleUpdateState: "+ target)

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var item = this.state.item;

        item[name] = value;

        this.setState({
            item: item
        });

        console.log(`Home => handleUpdateState: item => ${JSON.stringify(this.state.item)}`)

    }

    post(method, obj, context) {
        console.log("HOME -> POST")
        client({
            method: method,
            path: context,
            entity: obj,
            headers: {'Content-Type': 'application/json', 'Accept':'*/*'}
        }).done(response => {
            console.log("HOME -> POST: "+JSON.stringify(response));
        });
    }

    loadItem(id){
        this.loadItemFromServer([
            {rel: 'damageReports'},
            {rel: 'search'},
            {rel: 'findDamageReportByDamageKey', params: {damageKey: id}}
        ])
    }

    // tag::on-loadOrderFromServer[]
    loadItemFromServer(context) {
        follow(client, dataApiUri, context
        ).then(itemCollection => {
            return client({
                method: 'GET',
                path: itemCollection.entity._links.self.href,
                headers: {'Accept': 'application/json'}
            }).then(schema => {
                this.schema = schema.entity;
                return itemCollection;
            });
        }).done(itemCollection => {
            console.log("Home -> loadItemFromServer: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                item: itemCollection.entity,
                links: itemCollection.entity._links});
        });
    }

    toggleInfo(){
        this.setState({
            displayDetail:"none",
            displayInfo:"block",
            displayForm: "none",
            displayConfirmation:"none"
        });
    }

    toggleDetail(){
        this.setState({
            displayDetail:"block",
            displayInfo:"none",
            displayForm: "none",
            displayConfirmation:"none"
        });
    }

    toggleConfirm(){
        this.setState({
            displayDetail:"none",
            displayInfo:"none",
            displayForm: "none",
            displayConfirmation:"block"
        });
    }


    toggleForm(){
        this.setState({
            displayDetail:"none",
            displayInfo:"none",
            displayForm:"block",
            displayConfirmation:"none"
        });
    }

    render() {

        let action = "";
        action =  <Action item={this.state.item}
                          onConfirm={this.handleConfirm}  />

      return (
        <div>

            <Info item={this.state.item}
                  displayComponent={this.state.displayInfo} />

            <Detail item={this.state.item}
                    displayComponent={this.state.displayDetail} />

            <Form item={this.state.item}
                  displayComponent={this.state.displayForm}
                  labal={"Enter Third Party Message."}
                  message={"Enter Third Party Message."}
                  title={"Third Party Completion Form"}
                  action={action}
                  onUpdateState={this.handleUpdateState} />

            <Confirmation item={this.state.item}
                          displayComponent={this.state.displayConfirmation}
                          message="This is the third party confirmation message." />

        </div>
      )
    }
}
// end::app[]

module.exports = home;
