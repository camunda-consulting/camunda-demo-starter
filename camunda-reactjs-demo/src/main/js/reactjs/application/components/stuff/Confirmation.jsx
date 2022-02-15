/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents

class Detail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render(){

    return (

          <div style={{display: this.props.displayComponent}}>

              <div className="my-form">

                  <div className="small-8 small-offset-2 large-8 large-offset-2 columns">
                      <div className="form-registration-group">

                          <h3>{this.props.message}</h3>

                      </div>
                  </div>

              </div>
          </div>

    )
  }
}

module.exports = Detail;
