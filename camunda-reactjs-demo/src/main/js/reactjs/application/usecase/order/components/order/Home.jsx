/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('client');
const follow = require('follow'); // function to hop multiple links by "rel"

// tag::customComponents
// const StatusBar = require('StatusBar');
// const NavBar = require('TaskNavBar');

const OrderInfo = require('src/main/js/reactjs/application/usecase/order/components/order/Info');
const HomeFilterBar = require('src/main/js/reactjs/application/usecase/order/components/order/FilterBar');
const List = require('OrderList');
const Detail = require('OrderDetail');
// tag::customComponents

// tag::vars[]
const apiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}:${process.env.DATA_API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

// tag::app[]
class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceRequest: null,
            items: [],
            order: {},
            contact: {},
            task: null,
            attributes: [],
            pageSize: 10,
            links: {},
            displayOrderInfo: "block",
            displayDetail: "none",
            displayList: "block",
            displayInfo: "none",
            displayLine: "block",
            toggleDetailInfo: "off",
            displayConfirmation: "none",
            callUpdate: function (pageSize, that) {that.loadAllFromServer(pageSize)}
        };
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleFilterAll = this.handleFilterAll.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleClaim = this.handleClaim.bind(this);
        // this.handleMoreInfo = this.handleMoreInfo.bind(this);
        this.post = this.post.bind(this);
        this.toggleConfirm = this.toggleConfirm.bind(this);
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
        this.loadAllFromServer(this.state.pageSize);
        this.loadContactFromServer("paul.lungu@camunda.com");
        this.loadOrderFromServer("paul.lungu@camunda.com")
    }
    // end::follow-1[]

    handleApprove(e){
        e.preventDefault();
        var serviceRequest = this.state.task.serviceRequest;
        serviceRequest.approved = true;
        console.log("HandleApprove: " + JSON.stringify(serviceRequest));
        this.post(serviceRequest, "sr/save");
        this.post(serviceRequest, "sr/task/approve");
        this.props.history.push('/home');
        this.state.callUpdate(this.state.pageSize, this);
        this.handleBackClick();
    }

    handleReject(e){
        e.preventDefault();
        var serviceRequest = this.state.task.serviceRequest;
        serviceRequest.rejected = true;
        console.log("HandleReject: " + JSON.stringify(serviceRequest));
        this.post(serviceRequest, "sr/save");
        this.post(serviceRequest, "sr/task/reject");
        this.props.history.push('/rejected');
    }

    handleClaim(taskId){
        console.log("handleClaim: " + taskId);
        console.log("HandleClaim ");
        this.post({"userId": "paul"}, `engine-rest/task/${taskId}/claim`);
        this.props.history.push('/tasks');
    }

    // handleMoreInfo(){
    //     var serviceRequest = this.state.task.serviceRequest;
    //     console.log("handleMoreInfo: " + JSON.stringify(serviceRequest));
    //     this.post({  "messageName" : "risk-eval-request-for-info", "businessKey" : serviceRequest.serviceId,}, `engine-rest/message`);
    //     this.props.history.push('/tasks');
    // }

    post(method, obj, context) {
        console.log("ORDER -> HOME -> POST == Started")
        client({
            method: method,
            path: context,
            entity: obj,
            headers: {'Content-Type': 'application/json', 'Accept':'*/*'}
        }).done(response => {
            console.log("ORDER -> HOME -> POST: "+JSON.stringify(response));
        });
    }


    // tag::follow-2[]
    loadAllFromServer(pageSize) {
        follow(client, apiRoot, [
                {rel: 'stockItems', params: {size: pageSize}},
                {rel: 'search'},
                {rel: 'findStockItemsByPmiCode', params: {pmiCode: "USA"}},
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
            console.log("loadOrderItemsFromServer: "
                +JSON.stringify(itemCollection.entity._embedded.stockItems))
            this.setState({
                items: itemCollection.entity._embedded.stockItems,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }
    // end::follow-2[]

    // tag::on-loadOrderFromServer[]
    loadOrderFromServer(email) {
        follow(client, apiRoot, [
                {rel: 'orders'},
                {rel: 'search'},
                {rel: 'findOrderByEmailAndStarted', params: {email: email, started: false}}
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
            console.log("Order ->Home -> loadOrderFromServer: "
                +JSON.stringify(itemCollection.entity._embedded.orders))
            this.setState({
                order: itemCollection.entity._embedded.orders[0],
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

    // tag::navigate[]
    onNavigate(navUri) {
        client({method: 'GET', path: navUri}).done(taskCollection => {
            this.setState({
                tasks: taskCollection.entity._embedded.tasks,
                attributes: this.state.attributes,
                pageSize: this.state.pageSize,
                links: taskCollection.entity._links
            });
        });
    }
    // end::navigate[]

    handleFilterAll(pageSize){
      console.log("handle filter all task home")
      this.loadAllFromServer(pageSize);
    }

    handleSelectedItem(application, task) {

        if (task == null){
            alert("You don't have a task to complete.");
        }else {
            task.application = application;
            console.log("Megred Task: "+ JSON.stringify(task));
            this.setState({
                task: task,
                displayDetail: "block",
                displayList: "none"
            });
        }
    }

    handleBackClick(e){
       console.log("handleBackClick");
       this.setState({
           displayDetail: "none",
           displayList: "block"
         });
    }

    handleToggleClick(e){
        if (this.state.toggleDetailInfo === "off"){
            this.setState({
              toggleDetailInfo: "on",
              displayInfo: "block",
              displayLine: "none"
            });
        }else {
            this.setState({
                toggleDetailInfo: "off",
                displayInfo: "none",
                displayLine: "block"
              });
    
        }
    }

    toggleConfirm(){
        this.setState({
            displayList: "none",
            displayDetail:"none",
            displayOrderInfo:"none",
            displayConfirmation:"block"
        });
    }

    render() {
      var item = "";
      if (this.state.task !== null) {
        item = <Detail  task={this.state.task}
                        displayInfo={this.state.displayInfo}
                        displayLine={this.state.displayLine}
                        handleReject={this.handleReject}
                        handleApprove={this.handleApprove}
                        handleClaim={this.handleClaim}
                        handleMoreInfo={this.handleMoreInfo}/>
      }

      return (
        <div>

            {/*<HomeFilterBar />*/}

            <div style={{display: this.state.displayOrderInfo}}>
                <OrderInfo item={this.state.order} contact={this.state.contact}/>
            </div>

            <div style={{display: this.state.displayList}}>
              <List items={this.state.items}
                    order={this.state.order}
                    links={this.state.links}
                    pageSize={this.state.pageSize}
                    post={this.post}
                    toggleConfirm={this.toggleConfirm}
                    onNavigate={this.onNavigate}
                    updatePageSize={this.updatePageSize}
                    onSelectItem={this.handleSelectedItem}
                    onFilterAll={this.handleFilterAll} />
            </div>

            <div style={{display: this.state.displayDetail}}>
              <div className="top-bar show-for-medium small-12 columns">
               <div className="top-bar-left">
                 <ul className="menu">
                   <li className="topbar-title">
                     Item Detail
                   </li>
                 </ul>
               </div>
               <div className="top-bar-right">
                 <ul className="menu">
                   <li className="topbar-title">
                     <a className="button" onClick={this.handleBackClick}>Back</a>
                   </li>
                 </ul>
               </div>
              </div>
              <div className="">
                  {item}
              </div>
            </div>


              <div style={{display: this.state.displayConfirmation}}>
                  <div className="my-form">

                      <div className="small-8 small-offset-2 large-8 large-offset-2 columns">
                          <div className="form-registration-group">

                              <h3>Your order has been submitted for approval.</h3>

                          </div>
                      </div>

                  </div>
              </div>

          </div>
      )
    }
}
// end::app[]

module.exports = home;
