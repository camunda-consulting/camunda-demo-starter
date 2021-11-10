'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

const TenantList = require('src/main/js/reactjs/renewals/components/tenant/TenantList.jsx');
const TenantDetail = require('src/main/js/reactjs/renewals/components/tenant/TenantDetail.jsx');

const root = '/api';
// end::vars[]

// tag::app[]
class TenantMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tenant: null,
          tenants: [],
          attributes: [],
          pageSize: 2,
          links: {},
          displayDetail: "none",
          displayList: "block"
        };
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    // tag::update-page-size[]
    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) {
            this.loadFromServer(pageSize);
        }
    }
    // end::update-page-size[]

    // tag::follow-1[]
    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }
    // end::follow-1[]

    // tag::navigate[]
    onNavigate(navUri) {
        client({method: 'GET', path: navUri}).done(tenantCollection => {
            this.setState({
                tenants: tenantCollection.entity._embedded.tenants,
                attributes: this.state.attributes,
                pageSize: this.state.pageSize,
                links: tenantCollection.entity._links
            });
        });
    }
    // end::navigate[]

    // tag::follow-2[]
    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'tenants', params: {size: pageSize}}]
        ).then(tenantCollection => {
            return client({
                method: 'GET',
                path: tenantCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return tenantCollection;
            });
        }).done(tenantCollection => {
            this.setState({
                tenants: tenantCollection.entity._embedded.tenants,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: tenantCollection.entity._links});
        });
    }
    // end::follow-2[]

    handleSelectedItem(tenant){
      this.setState({
        tenant: tenant,
        displayDetail: "block",
        displayList: "none"
      });
    }

    handleBackClick(e){
      this.setState({
        displayDetail: "none",
        displayList: "block"
      });
    }
    
    onDelete(tenant) {
        client(
           {method: 'DELETE', path: tenant._links.self.href}
        ).done(response => {
            alert("Tenant Deleted Successfully ");
            this.loadFromServer(this.state.pageSize);
        },response => {
           if (response.error){
                alert("Somthing went wrong "+ reponse.error)   
           }else if (response.status.code === 400) {
               alert('Bad Request: The request was not successful');
           }else if (response.status.code === 403) {
               alert('ACCESS DENIED: You are not authorized to delete');
           }else{
               alert("Somthing went wrong "+ reponse.error);
           }   
        });
    }

    render() {
      var item = "";
      if (this.state.tenant !== null) {
        item = <TenantDetail tenant={this.state.tenant}/>
      }

      return (
          <div>
            <div style={{display: this.state.displayList}}>
            <TenantList tenants={this.state.tenants}
                links={this.state.links}
                pageSize={this.state.pageSize}
                onNavigate={this.onNavigate}
                updatePageSize={this.updatePageSize}
                onSelectItem={this.handleSelectedItem}
                onDelete={this.onDelete}/>
            </div>
            <div style={{display: this.state.displayDetail}}>
              <a className="button" onClick={this.handleBackClick}>&lt;&lt;&lt;Back</a>
              <div className="row">
                  <div className="small-12 columns">
                    {item}
                  </div>
              </div>
            </div>
          </div>
        )
    }
}
// end::app[]

module.exports = TenantMain;
