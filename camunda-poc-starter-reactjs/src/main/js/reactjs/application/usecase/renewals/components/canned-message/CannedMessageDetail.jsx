// tag::vars[]
const React = require('react');
// end::vars[]

class CannedMessageDetail extends React.Component{
  constructor(props) {
      super(props);
  }

  render(){
    return (
      <div>
        <h2>Canned Message Detail</h2>
        <div>
          <ul>
            <li>{this.props.cannedMessage.subject}</li>
            <li>{this.props.cannedMessage.text}</li>
            <li>{this.props.cannedMessage.html}</li>
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = CannedMessageDetail;
