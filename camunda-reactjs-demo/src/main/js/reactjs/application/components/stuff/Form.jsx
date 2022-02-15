/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents

// tag::vars[]

// end::vars[]

class Form extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event){
      event.preventDefault();

      const target = event.target;

      console.log("Form -> HandleChange: "+target);

      this.props.onUpdateState(target);

  }

  render() {

    return (
        <div style={{display: this.props.displayComponent}}>


            <div className="my-form">
                <div className="small-8 small-offset-2 large-8 large-offset-2 columns">
                    <div className="form-registration-group">

                        <p>{this.props.title}</p>

                        <div className="input-group">
                                <span className="input-group-label">{this.props.label}</span>
                                <textarea className="input-group-field"
                                          rows="5"
                                          ref="message"
                                          name="status"
                                          placeholder={this.props.message}
                                          onChange={this.handleChange}
                                          value={this.props.status}/>
                        </div>

                    </div>
                </div>
            </div>

            {this.props.action}

        </div>
    );
  }
}

module.exports = Form;
