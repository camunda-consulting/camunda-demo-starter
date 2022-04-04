/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */
'use strict';

const React = require('react');
const WorkflowStartAction = require('WorkflowStartAction');

class DetailForm extends React.Component {
        
    constructor(props) {
      super(props);
        this.state = {

        };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        const target = event.target;
        console.log("DetailForm -> HandleChange: "+target);
        this.props.onUpdateState(target, this.props.formProps);
    }

    render() {
        //console.log("Detail Form: "+ JSON.stringify(this.props.submission));
        return (
          <div>
            <div className="my-form">
              <div className="small-12 large-12 small-offset-1 columns form-registration-group" >

                  <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">Message</span>
                          <textarea className="input-group-field form-registration-input"
                                 type="text"
                                 name="message"
                                 ref="message"
                                 onChange={this.handleChange}
                                 value={this.props.formProps.message}
                          />
                      </div>
                  </div>

                  <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">E-Mail</span>
                          <input className="input-group-field form-registration-input"
                                 type="text"
                                 name="email"
                                 ref="email"
                                 onChange={this.handleChange}
                                 value={this.props.formProps.email} />
                      </div>
                  </div>

              </div>
            </div>

            <WorkflowStartAction submission={this.props.submission}
                             formProps={this.props.formProps}
                             workflow={this.props.workflow}
                             onStart={this.props.onStart}
                             toggleForm={this.props.toggleForm} />
        </div>
    );
  }
}

module.exports = DetailForm;
