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

class OptionForm extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {
        status: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(e){

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // var processing = this.refs.cpSendProcessing.value;
        // var underwirting = this.refs.cpSendUnderwirting.value;

        console.log("Task -> OptionForm -> handleChange refs: " +value+" :: "+name);

        let variables = `{"type": {"value": "${name}" }}`;

        console.log("Task -> OptionForm -> handleChange vars: " +variables);

        this.props.updateWorkflowVariables(JSON.parse(variables));
    }

  render() {

    return (

        <div className="my-form option-form">
            <div className="small-12 large-12 small-offset-1 columns" >

                <div className="small-9 large-9">

                    <div className="input-group">
                        {/*<span className="input-group-label">Cancelation of Policy</span>*/}

                        <span className="input-label">Cancelation of Policy</span>
                        <input className="input-group-field" type="checkbox"
                               ref="cpSendProcessing" onChange={this.handleChange}
                               name="cop" checked={this.state.status}/>

                    </div>

                    <div className="input-group">
                        {/*<span className="input-group-label">Extension Request</span>*/}

                        <span className="input-label">Extension Request</span>
                        <input className="input-group-field" type="checkbox"
                               ref="er-send-processing" onChange={this.handleChange}
                               name="er" checked={this.state.status} />
                    </div>

                    <div className="input-group">
                        {/*<span className="input-group-label">Loss Payee / Mortgage Changes</span>*/}

                        <span className="input-label">Loss Payee / Mortgage Changes</span>
                        <input className="input-group-field" type="checkbox"
                               ref="lpmc-send-processing" onChange={this.handleChange}
                               name="lpmc" checked={this.state.status}  />
                    </div>


                </div>

            </div>
        </div>

    );
  }
}

module.exports = OptionForm;
