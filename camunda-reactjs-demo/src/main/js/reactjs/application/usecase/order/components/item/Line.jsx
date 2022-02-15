/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
var {Link, IndexLink} = require('react-router');
const React = require('react');

// tag::customComponents
// end::customComponents

// tag::vars[]
const apiHost = process.env.API_HOST != "" ? `${process.env.API_HOST}:${process.env.API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class Line extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        task: null
      };
      this.handleChange = this.handleChange.bind(this);
  }


    handleChange(e){
        e.preventDefault();
        var item = this.props.item;

        item.quantity = this.refs.item.value;

        console.log("ITEM -> Line -> handleChange: "+JSON.stringify(item));

        this.props.onUpdateItem(item);

    }

    render() {

      return (
          <tr className="my-line">
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.product}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.pmiCode}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.pmiDescription}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.item)}>{this.props.item.coPolicyNo}</td>
              <td className="item-quantity"><input className="input-group-field" type="text"
                         ref="item" onChange={this.handleChange}
                         value={this.props.item.quantity} /></td>
          </tr>
      )
  }
}
// end::task[]

module.exports = Line;
