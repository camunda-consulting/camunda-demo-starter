'use strict';

var {Link, IndexLink} = require('react-router');

// tag::vars[]
const React = require('react');

// tag::CannedMessage[]
class CannedMessageLine extends React.Component{

  constructor(props) {
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
  }


  handleDelete() {
      this.props.onDelete(this.props.cannedMessage);
  }
  
  render() {
      return (
          <tr>
              <td onClick={this.props.onSelectItem.bind(null, this.props.cannedMessage)}>{this.props.cannedMessage.subject}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.cannedMessage)}>{this.props.cannedMessage.text}</td>
              <td onClick={this.props.onSelectItem.bind(null, this.props.cannedMessage)}>{this.props.cannedMessage.html}</td>
              <td>
                  <button onClick={this.handleDelete}>Delete</button>
              </td>
          </tr>
      )
  }
}
// end::CannedMessage[]

module.exports = CannedMessageLine;
