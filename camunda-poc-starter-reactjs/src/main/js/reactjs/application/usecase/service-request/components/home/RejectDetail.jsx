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
const ServiceStartForm = require('src/main/js/reactjs/application/service-request/components/home/ServiceSelectForm.jsx');
const ServiceForm = require('src/main/js/reactjs/application/service-request/components/home/ServiceForm.jsx');
const ServiceDetailForm = require('src/main/js/reactjs/application/service-request/components/home/ServiceDetailForm.jsx');
const ServiceSupplierForm = require('src/main/js/reactjs/application/service-request/components/home/ServiceSupplierForm.jsx');
const Info = require('src/main/js/reactjs/application/service-request/components/home/Info.jsx');
const FilterBar = require('src/main/js/reactjs/application/service-request/components/home/FilterBar.jsx');

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class Detail extends React.Component{
  constructor(props) {
        super(props);
        this.state = {
        serviceRequest: {},
        serviceRequests: null,
        displayDetail: "block",
        displayServiceStartForm: "block",
        displayServiceForm: "block",
        displayServiceDetailForm: "block",
        displayServiceSupplierForm: "block",
        // task: null,
        // tasks: [],
        attributes: [],
        pageSize: 10,
        links: {},
        callUpdateAll: function (pageSize, that) {
            that.loadRejectedFromServer(pageSize)
        },
        callUpdateItem: function (serviceId, that) {
            that.loadItemFromServer(serviceId)
        }
      };
      // this.toggleForm = this.toggleForm.bind(this)
      // this.uuidv4 = this.uuidv4.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleDone = this.handleDone.bind(this);
      this.handleUpdateState = this.handleUpdateState.bind(this);
      this.handleUpdateStartState = this.handleUpdateStartState.bind(this);
      this.post = this.post.bind(this);
  }

    // tag::follow-1[]
    componentDidMount() {
        this.state.callUpdateAll(this.state.pageSize, this);
    }
    // end::follow-1[]


    // toggleForm(form){
    //   if(form == "service") {
    //       this.setState({
    //           displayServiceStartForm: "none",
    //           displayServiceForm: "block",
    //           displayServiceDetailForm: "none",
    //           displayServiceSupplierForm: "none"
    //       });
    //   }else if (form == "detail"){
    //       this.setState({
    //           displayServiceStartForm: "none",
    //           displayServiceForm: "none",
    //           displayServiceDetailForm: "block",
    //           displayServiceSupplierForm: "none"
    //       });
    //   }else if (form == "supplier"){
    //       this.setState({
    //           displayServiceStartForm: "none",
    //           displayServiceForm: "none",
    //           displayServiceDetailForm: "none",
    //           displayServiceSupplierForm: "block"
    //       });
    //   }else if (form == "start"){
    //       this.setState({
    //           displayServiceStartForm: "block",
    //           displayServiceForm: "none",
    //           displayServiceDetailForm: "none",
    //           displayServiceSupplierForm: "none"
    //       });
    //   }
    // }

    // uuidv4() {
    //     return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    //         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    //     );
    // }

    handleUpdateState(serviceRequest){
        console.log("handleUpdateState rejected: "+ JSON.stringify(serviceRequest))

        this.setState({
            serviceRequest: serviceRequest
        });

    }

    handleUpdateStartState(serviceId){
        console.log("handleUpdateStartState rejected: "+ JSON.stringify(serviceId));

        this.state.callUpdateItem(serviceId, this);

    }

    handleInputChange(e){
        e.preventDefault();
        var serviceRequest = this.props.serviceRequest;
        serviceRequest.serviceOwner = this.refs.serviceOwner.value;
        serviceRequest.sourcingManager = this.refs.sourcingManager.value;
        serviceRequest.acquiringDivision = this.refs.acquiringDivision.value;
        serviceRequest.sourcingComments = this.refs.sourcingComments.value;

        this.handleUpdateState(serviceRequest);

    }


    handleChange(e){
        e.preventDefault();

        var serviceId = this.refs.pid.value;


        console.log("Start Form handleChange: "+ JSON.stringify(serviceId));

        this.handleUpdateStartState(serviceId);
    }

    handleDone(e){
        e.preventDefault();

        var serviceRequest = this.state.serviceRequest;

        serviceRequest.rejected = false;

        console.log("Rejected HandleDone: " + JSON.stringify(this.state.serviceRequest))

        //post the object to the endpoint to save the Service Request
        this.post(serviceRequest, "sr/save");

        //post the object to the endpoint to Start the workflow
        this.post(serviceRequest, "sr/update/rejected");

        this.props.onRedirect("/tasks")
    }

    // tag::follow-2[]
    loadRejectedFromServer(pageSize) {
        follow(client, apiRoot, [
                {rel: 'serviceRequestEntities', params: {size: pageSize}},
                {rel: 'search'},
                {rel: 'findServiceRequestEntitiesByRejectedAndStarted', params: {rejected: true, started: true}}
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
            console.log("Rejected -> Detail -> rejectedServiceRequestEntities: "
                +JSON.stringify(itemCollection.entity._embedded.serviceRequestEntities))
            this.setState({
                serviceRequests: itemCollection.entity._embedded.serviceRequestEntities,
                // attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }
    // end::follow-2[]

    // tag::on-delete[]
    // tag::on-delete[]
    loadItemFromServer(serviceId) {
        follow(client, apiRoot, [
                {rel: 'serviceRequestEntities'},
                {rel: 'search'},
                {rel: 'findServiceRequestByServiceId', params: {serviceId: serviceId}}
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
            console.log("loadItemFromServer serviceRequestEntity: "
                +JSON.stringify(itemCollection.entity))
            this.setState({
                serviceRequest: itemCollection.entity,
                // attributes: Object.keys(this.schema.properties),
                // pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }


    // end::on-delete[]
    post(obj, context) {
        console.log("POST Started")
        client({
            method: 'POST',
            path: apiHost+context,
            entity: obj,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            console.log("POST Request Complete");
        });
    }

  render(){

      var displayServiceStartForm = this.state.displayServiceStartForm;
      var displayServiceForm = this.state.displayServiceForm;
      var displayServiceDetailForm = this.state.displayServiceDetailForm;
      var displayServiceSupplierForm = this.state.displayServiceSupplierForm;

      var info = "";
      if (this.state.serviceRequest !== null) {
         info =  <div style={{display: this.props.displayInfo}}>
                    <Info
                        item={this.state.serviceRequest}/>
                    </div>
      }

      if (this.state.serviceRequests !== null){
          // console.log("Start FORM SR's: "+ JSON.stringify(this.props.serviceRequests));
          var options = this.state.serviceRequests.map(serviceRequest =>
              // console.log("Start FORM SR's: "+ JSON.stringify(serviceRequest) +" :: "+serviceRequest._links.self.href)
              <option key={serviceRequest._links.self.href} value={serviceRequest.serviceId}>{serviceRequest.serviceId}</option>
          );
      }

    return (
      <div>

        {/*<FilterBar toggleForm={this.toggleForm} title=""/>*/}

        {/*{info}*/}

        {/*<div></div>*/}

        <div className="row">

          <div className="my-form small-10 small-offset-1 large-10 large-offset-1 columns">

            <form>
                    <div className="input-group">
                        <select className="form-registration-input"
                                ref="pid"
                                onChange={this.handleChange}
                                value={this.state.serviceRequest.serviceId} >

                            <option defaultValue>Please Select</option>
                            {options}
                        </select>
                    </div>

                  <div className="input-group">
                      <span className="input-group-label">Service Category</span>

                      <select className="input-group-field"
                              ref="serviceCategory"
                              onChange={this.handleInputChange}
                              value={this.state.serviceRequest.serviceCategory}>

                          <option defaultValue>Choose Category</option>
                          <option value="1">Category 1 </option>
                          <option value="2">Category 2 </option>
                          <option value="3">Category 3 </option>
                          <option value="5">Category 5 </option>
                      </select>

                  </div>

                  <div className="input-group">
                        <textarea rows="5" ref="serviceDescription"
                                  placeholder="Service Description"
                                  onChange={this.handleInputChange}
                                  value={this.state.serviceRequest.serviceDescription}/>
                  </div>

                  <div className="input-group">
                      <span className="input-group-label">Service Owner</span>
                      <input className="input-group-field" type="text"
                             ref="serviceOwner" onChange={this.handleInputChange}
                             value={this.state.serviceRequest.serviceOwner} />
                  </div>

                  <div className="input-group">
                      <span className="input-group-label">Sourcing Manager</span>
                      <input className="input-group-field" type="text"
                             ref="sourcingManager" onChange={this.handleInputChange}
                             value={this.state.serviceRequest.sourcingManager}/>
                  </div>

                  <div className="input-group">
                      <span className="input-group-label">Acquiring Division</span>
                      <select className="input-group-field" ref="acquiringDivision"
                              value={this.state.serviceRequest.acquiringDivision}
                              onChange={this.handleInputChange}>

                          <option defaultValue>Choose Division</option>
                          <option value="1">Division 1 </option>
                          <option value="2">Division 2 </option>
                          <option value="3">Division 3 </option>
                          <option value="5">Division 4 </option>
                      </select>
                  </div>

                  <textarea rows="5" ref="sourcingComments"
                            placeholder="Sourcing Comments"
                            onChange={this.handleInputChange}
                            value={this.state.serviceRequest.sourcingComments}/>

                  <div className="input-group">
                      <span className="input-group-label">Supplier</span>
                      <input className="input-group-field" type="text" ref="buContractingService"
                             onChange={this.handleInputChange}
                             value={this.state.serviceRequest.buContractingService} />
                  </div>

            </form>

           </div>

          </div>


          <div className="top-bar">
              <div className="top-bar-right columns">
                  <ul className="menu my-bar">
                      <li>
                          <a className="button small my-button" key="service" onClick={this.handleDone}>Complete</a>
                      </li>
                  </ul>
              </div>
          </div>

      </div>
    )
  }
}

module.exports = Detail;
