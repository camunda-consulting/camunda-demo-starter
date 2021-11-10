/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

class Form extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(e) {
      e.preventDefault();
      console.log("Items -> From -> handleRemove")
  }


  render() {

    return (
      <div className="top-bar">

        <div>
            <a id="remove" className="button small my-button" onClick={this.handleRemove} >Remove</a>
        </div>

      </div>
    );
  }
}

module.exports = Form;
