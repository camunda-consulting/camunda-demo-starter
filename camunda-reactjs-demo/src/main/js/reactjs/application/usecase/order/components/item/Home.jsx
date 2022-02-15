/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');
const client = require('client');
const follow = require('follow'); // function to hop multiple links by "rel"

// tag::customComponents
const List = require('ItemList');
const Detail = require('ItemDetail');
// tag::customComponents

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

// tag::app[]
class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // serviceRequest: null,
            item: {},
            attributes: [],
            pageSize: 20,
            links: {},
            displayDetail: "none",
            displayList: "block",
            displayInfo: "none",
            displayLine: "block",
            toggleDetailInfo: "off",
            callUpdate: function (pageSize, that) {that.loadAllFromServer(pageSize)}
        };
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleFilterAll = this.handleFilterAll.bind(this);
        this.post = this.post.bind(this);
        this.postItem = this.postItem.bind(this);
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
        console.log("Item -> Home -> componentDidMount");
    }
    // end::follow-1[]

    componentDidUpdate() {
        console.log("Item -> Home -> componentDidUpdate");
    }

    post(obj, context) {
        console.log("Items -> Home -> POST ")
        client({
            method: 'POST',
            path: apiRoot+context,
            entity: obj,
            headers: {'Content-Type': 'text/uri-list', 'Accept': '*/*'}
        }).done(response => {
            console.log("ITEMS -> HOME -> POST: "+JSON.stringify(response));
        });
    }

    // end::on-delete[]
    postItem(method, obj, context) {
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

    handleUpdateItem(item){
        console.log("Item -> Home -> handleUpdateItem: "+JSON.stringify(item));
        this.postItem("PATCH", item, item._links.self.href);
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

    handleSelectedItem(item) {

            this.setState({
                item: item,
                displayDetail: "block",
                displayList: "none"
            });
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

    render() {
      var item = "";
      if (this.state.item !== null) {
        item = <Detail  item={this.state.item}
                        displayInfo={this.state.displayInfo}
                        displayLine={this.state.displayLine}
                        handleReject={this.handleReject}
                        handleApprove={this.handleApprove}
                        handleClaim={this.handleClaim}
                        handleMoreInfo={this.handleMoreInfo}/>
      }

      return (
          <div>

            <div style={{display: this.state.displayList}}>
              <List items={this.props.items}
                    order={this.props.order}
                    links={this.state.links}
                    pageSize={this.state.pageSize}
                    onNavigate={this.onNavigate}
                    onUpdateNote={this.onUpdateNote}
                    updatePageSize={this.updatePageSize}
                    onSelectItem={this.handleSelectedItem}
                    onUpdateItem={this.handleUpdateItem}
                    onFilterAll={this.handleFilterAll}
                    toggleForm={this.props.toggleForm}
                    post={this.post}
                    onRedirect={this.props.onRedirect}/>


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

          </div>
      )
    }
}
// end::app[]

module.exports = home;
