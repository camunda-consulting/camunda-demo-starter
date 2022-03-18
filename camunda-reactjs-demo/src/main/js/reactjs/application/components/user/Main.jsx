/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');
const ReactDOM = require('react-dom')
const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

// tag::customComponents
const StartForm = require('StartForm');
const DetailForm = require('DetailForm');
const Info = require('Info');
const FilterBar = require('FilterBar');
const Items = require('ItemHome');

// tag::vars[]
const apiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}:${process.env.DATA_API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class Main extends React.Component{
  constructor(props) {
        super(props);
        this.state = {
        order: {},
        orders: null,
        items: [],
        contact: {},
        displayDetail: "block",
        displayServiceStartForm: "none",
        displayServiceDetailForm: "block",
        displayItems: "none",
        displayConfirmation:"none",
        attributes: [],
        pageSize: 10,
        links: {},
        callUpdateAll: function (pageSize, that) {
            console.log("callUpdateAll");
            that.loadOrdersFromServer(pageSize);
            that.loadContactFromServer("paul.lungu@camunda.com");
        },
        callUpdateItem: function (orderId, that) {
            console.log("callUpdateItem"+ JSON.stringify(orderId));
            that.loadOrderFromServer(orderId)
        }
      };
      this.toggleForm = this.toggleForm.bind(this)
      this.uuidv4 = this.uuidv4.bind(this);
      this.handleStart = this.handleStart.bind(this);
      this.handleUpdateState = this.handleUpdateState.bind(this);
      this.handleUpdateStartState = this.handleUpdateStartState.bind(this);
      this.post = this.post.bind(this);
  }

    // tag::did-mount[]
    componentDidMount() {
        console.log("Detail Component Did Mount");
        this.state.callUpdateAll(this.state.pageSize, this);
    }
    // end::did-mount[]

    componentDidUpdate() {
      console.log("Detail Component Did Update");
    }

    toggleForm(form){
        if (form == "detail"){
          this.setState({
              displayServiceStartForm: "none",
              displayServiceDetailForm: "block",
              displayItems:"none",
              displayConfirmation:"none"
          });
      }else if (form == "start"){
          this.setState({
              displayServiceStartForm: "block",
              displayServiceDetailForm: "none",
              displayItems: "none",
              displayConfirmation:"none"
          });
        }else if (form == "items"){
            this.setState({
                displayServiceStartForm: "none",
                displayServiceDetailForm: "none",
                displayItems: "block",
                displayConfirmation:"none"
            });
        }else if (form == "confirm"){
            this.setState({
                displayServiceStartForm: "none",
                displayServiceDetailForm: "none",
                displayItems: "none",
                displayConfirmation:"block"
            });
        }
    }

    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    handleUpdateState(order){
        console.log("handleUpdateState service request: "+ JSON.stringify(order))

        this.setState({
            order: order
        });

    }

    handleUpdateStartState(orderKey){
        console.log("handleUpdateState service request: "+ JSON.stringify(orderKey));

        this.state.callUpdateItem(orderKey, this);

        // this.loadOrderItemsFromServer(orderKey, 20);

        this.loadItemsFromServer(this.state.contact, 20);
    }


    handleStart(e){
        e.preventDefault();

        var order = {
            orderKey: this.uuidv4(),
            email: this.state.contact.email
        }

        console.log("Handle Start: " + JSON.stringify(order));

        //post the object to the endpoint to save the entity
        this.post("POST", order, apiRoot+"/orders");

        this.state.callUpdateAll(this.state.pageSize, this);

        this.loadItemsFromServer(this.state.contact, 20);

        this.toggleForm("detail");

    }



    // tag::follow-2[]
    loadOrdersFromServer(pageSize) {
        follow(client, apiRoot, [
                {rel: 'orders', params: {size: pageSize}},
                {rel: 'search'},
                {rel: 'findOrderByStarted', params: {started: false}}
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
            console.log("loadOrdersFromServer: "
                +JSON.stringify(itemCollection.entity._embedded.orders))
            this.setState({
                orders: itemCollection.entity._embedded.orders,
                // attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }
    // end::follow-2[]

    // tag::on-loadOrderFromServer[]
    loadOrderFromServer(orderKey) {
        follow(client, apiRoot, [
            {rel: 'orders'},
            {rel: 'search'},
            {rel: 'findOrderByOrderKey', params: {orderKey: orderKey}}
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
            console.log("loadOrderFromServer: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                order: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

    // tag::on-loadContactFromServer[]
    loadContactFromServer(email) {
        follow(client, apiRoot, [
                {rel: 'contacts'},
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
            console.log("loadContactFromServer: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                contact: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

    // tag::follow-2[]
    loadItemsFromServer(contact, pageSize) {
        follow(client, apiRoot, [
                {rel: 'stockItems', params: {size: pageSize}},
                {rel: 'search'},
                {rel: 'findStockItemsByPmiCode', params: {pmiCode: contact.country}},
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
            console.log("loadStockItemsFromServer: "
                +JSON.stringify(itemCollection.entity._embedded.stockItems))
            this.setState({
                items: itemCollection.entity._embedded.stockItems,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }
    // end::follow-2[]

    // end::on-delete[]
    post(method, obj, context) {
        if(method == null){
            method = "POST"
        }
        console.log(`POST Started - METHOD:${JSON.stringify(method)} OBJECT:${JSON.stringify(obj)} CONTEXT: ${JSON.stringify(context)}`);

        client({
            method: method,
            path: context,
            entity: obj,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            console.log("POST Request Complete"+ JSON.stringify(response));
            this.setState({
                order: response.entity
            });
        });
    }

  render(){

      var displayServiceStartForm = this.state.displayServiceStartForm;
      var displayServiceDetailForm = this.state.displayServiceDetailForm;
      var displayItems = this.state.displayItems;
      var displayConfirmation = this.state.displayConfirmation;

      var info = "";

      console.log("Detail Render: "+JSON.stringify(this.state.order));

      // if (this.state.order.orderKey != null) {
         info =  <Info item={this.state.order} contact={this.state.contact}/>
      // }

    return (
      <div>

        <FilterBar toggleForm={this.toggleForm} title="Promotional Material Order"/>

        {/*{info}*/}
        <Info item={this.state.order} contact={this.state.contact}/>

        <div style={{display: displayServiceStartForm}}>
            <StartForm onUpdateStartState={this.handleUpdateStartState}
                              onStart={this.handleStart}
                              orders={this.state.orders}
                              order={this.state.order} />
        </div>

        <div style={{display: displayServiceDetailForm}}>
           <DetailForm order={this.state.order}
                       contact={this.state.contact}
                       onUpdateState={this.handleUpdateState}
                       post={this.post}
                       onRedirect={this.props.onRedirect}
                       toggleForm={this.toggleForm}/>
        </div>

        <div style={{display: displayItems}}>
            <Items order={this.state.order}
                   items={this.state.items}
                   toggleForm={this.toggleForm}
                   onRedirect={this.props.onRedirect}/>
        </div>

      </div>
    )
  }
}

module.exports = Main;
