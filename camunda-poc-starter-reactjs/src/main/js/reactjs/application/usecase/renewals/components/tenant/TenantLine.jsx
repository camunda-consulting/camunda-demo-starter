'use strict';

var {Link, IndexLink} = require('react-router');

// tag::vars[]
const React = require('react');

// tag::tenant[]
class TenantLine extends React.Component{

  constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
  }


  handleDelete() {
      this.props.onDelete(this.props.tenant);
  }
  
  render() {
      return (
          <tr >
              <td onClick={this.props.onSelectItem.bind(null, this.props.tenant)}>{this.props.tenant.name}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.tenant)}>{this.props.tenant.email}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.tenant)}>{this.props.tenant.unitSlug}</td>
              <td>
                 <button onClick={this.handleDelete}>Delete</button>
              </td>
          </tr>
      )
  }
}
// end::tenant[]

module.exports = TenantLine;
