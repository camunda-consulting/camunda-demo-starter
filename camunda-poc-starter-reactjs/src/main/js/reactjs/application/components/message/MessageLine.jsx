'use strict';

var {Link, IndexLink} = require('react-router');

// tag::vars[]
const React = require('react');
const DisplayDate = require('src/main/js/reactjs/application/components/date/DisplayDateTime.jsx');

// tag::message[]
class MessageLine extends React.Component{

  constructor(props) {
      super(props);
  }

  render() {
    return (
        <tr onClick={this.props.onSelectItem.bind(null, this.props.message)}>
            <td>{this.props.message.recipient}</td>
            <td>{this.props.message.sender}</td>
            <td>{this.props.message.subject}</td>
            <td><DisplayDate date={this.props.message.created} /></td>
        </tr>
    )
  }
}
// end::message[]

module.exports = MessageLine;
