/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
import {startWith, switchMap} from "rxjs/operators";
import {interval} from "rxjs";

const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;

const React = require('react');

// tag::customComponents
// tag::vars[]


class Info extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
      }

  }


    render(){

        var policyId = "";
        if (this.props.policy != null){
          policyId = this.props.policy.coPolicyNo
        }

        var displayPolicyTerm = "";
        if(this.props.policy.coPolicyTerm != null && this.props.policy.coPolicyTerm != "") {
            displayPolicyTerm =  <ul>
                         <li><span className="label">Co Policy Term</span><span className="data">{this.props.policy.coPolicyTerm}</span></li>
                       </ul>

        }

        var displayInsuredNm = "";
        if(this.props.policy.coInsuredNm != null && this.props.policy.coInsuredNm != "") {
            displayInsuredNm =  <ul>
                <li><span className="label">Co Insured Nm</span><span className="data">{this.props.policy.coInsuredNm}</span></li>
            </ul>

        }

        var displayQuoteNo = "";
        if(this.props.policy.coQuoteNo != null && this.props.policy.coQuoteNo != "") {
            displayQuoteNo =  <ul>
                <li><span className="label">Co Quote No</span><span className="data">{this.props.policy.coQuoteNo}</span></li>
            </ul>

        }

        var displayInsCoNm = "";
        if(this.props.policy.coInsCoNm != null && this.props.policy.coInsCoNm != "") {
            displayInsCoNm =  <ul>
                <li><span className="label">Co Insurance Name</span><span className="data">{this.props.policy.coInsCoNm}</span></li>
            </ul>

        }


        var displayCreditCheckStarted = "";
        if(this.props.policy.creditCheckStarted != null) {
            var status = "Not Started";
            if(this.props.policy.creditCheckStarted) {
                status = "Started"
            }
            displayCreditCheckStarted =  <ul>
                <li><span className="label">Credit Check Status</span><span className="data">{status}</span></li>
            </ul>

        }

      return (
          <div className="my-form my-info">
            <div className="row">

              <div className="small-5 small-offset-1 columns">
                <div className="card" >
                  <div className="card-divider text-center">
                    <h4>Task Info</h4>
                  </div>
                  <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                    <ul>
                      <li><span className="label">Task name</span><span className="data">{this.props.task.name}</span></li>
                      <li><span className="label">Task Id</span><span className="data">{this.props.task.id}</span></li>
                    </ul>
                  </div>
                </div>
              </div>

                <div className="small-5 columns">
                    <div className="card" style={{width: "400px"}}>
                        <div className="card-divider text-center">
                            <h4>Policy Info</h4>
                        </div>
                        <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                            <ul>
                                <li><span className="label">Co Policy No</span><span className="data">{policyId}</span></li>
                            </ul>
                            {displayPolicyTerm}
                            {displayInsuredNm}
                            {displayQuoteNo}
                            {displayInsCoNm}
                            {displayCreditCheckStarted}
                        </div>
                    </div>
                </div>


            </div>
        </div>
      )                 
  }
  
}
  
module.exports = Info;