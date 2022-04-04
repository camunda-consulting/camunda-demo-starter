/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
var React = require('react');

// tag::customComponents

// tag::vars[]
// end::vars[]

class SearchForm extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(e){
        e.preventDefault();
        var policy = this.props.policy;

        policy.coPolicyNo = this.refs.policyId.value;

        this.props.handleUpdatePolicy(policy);
    }

  render() {

      var policyId = "";
      if (this.props.policy != null){
          policyId = this.props.policy.coPolicyNo;
      }

    return (

        <div className="my-form search-form">
            <div className="small-12 large-12 small-offset-1 columns" >

                <div className="small-9 large-9">
                    <div className="input-group">
                        <span className="input-group-label">Search Policy</span>
                        <input className="input-group-field" type="text"
                               ref="policyId" onChange={this.handleChange}
                               value={policyId} />
                    </div>
                </div>

            </div>
        </div>


    );
  }
}

module.exports = SearchForm;
