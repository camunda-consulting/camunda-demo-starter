/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

const client = require('client');
const follow = require('follow'); // function to hop multiple links by "rel"

class DataApi {

    // end::on-delete[]
    async post(method, obj, context) {
        if(method == null){
            method = "POST"
        }
        console.log(`POST Started - METHOD:${JSON.stringify(method)} OBJECT:${JSON.stringify(obj)} CONTEXT: ${JSON.stringify(context)}`);

        await client({
            method: method,
            path: context,
            entity: obj,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            if (response.status.code == 200){
                console.log("POST Request Complete"+ JSON.stringify(response));
            }
        });
    }


    // ********************************************************
    //  Load Functions
    // ********************************************************

    // tag::follow-2[]
    loadObjectsFromServer(pageSize, obj) {
        follow(client, dataApi, [
                {rel: obj, params: {size: pageSize}}
                // {rel: 'search'},
                // {rel: 'findSubmissionByStarted', params: {started: true}}
            ]
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
            console.log("loadObjectsFromServer: "
                +JSON.stringify(itemCollection.entity._embedded.cases))
            this.setState({
                submissions: itemCollection.entity._embedded.cases,
                // attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }
    // end::follow-2[]

    // tag::on-loadByKeyFromServer[]
    loadByKeyFromServer(key) {
        follow(client, dataApi, [
                {rel: 'cases'},
                {rel: 'search'},
                {rel: 'findCaseByKey', params: {key: key}}
            ]
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
            console.log("loadByKeyFromServer: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                submission: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

    // tag::on-loadUserFromServer[]
    loadUserFromServer(email) {
        follow(client, dataApi, [
                {rel: 'users'},
                {rel: 'search'},
                {rel: 'findContactByEmail', params: {email: email}}
            ]
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
            console.log("loadUserFromServer: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                user: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

}

module.exports = DataApi;