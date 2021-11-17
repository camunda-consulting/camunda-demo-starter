/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');


class Info extends React.Component{
  constructor(props) {
      super(props);
  }

  render(){
      return (

        <div style={{display: this.props.displayComponent}} >

            <p>This is the Info Component</p>

        </div>
      )
  }
  
}
  
module.exports = Info;