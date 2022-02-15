'use strict';

// tag::vars[]
const React = require('react');

const Message = require('src/main/js/reactjs/application/components/message/MessageLine.jsx');

const MessageFilterBar = require('src/main/js/reactjs/application/components/message/MessageFilterBar.jsx');

// tag::message-list[]
class MessageList extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {

      var messages = "";
      if (this.props.messages){
		messages = this.props.messages.map(message =>
			<Message key={message._links.self.href}
                message={message}
                onSelectItem={this.props.onSelectItem}/>
		    );
      }

      return (
		    <div>
          <div className="row">
              <div className="small-12 columns">
                  <MessageFilterBar
                      renewal={this.props.renewal}
                      onRefreshMessages={this.props.onRefreshMessages}/>
              </div>
          </div>
          <div className="row">
            <div className="small-12 columns" style={{overflow:"auto",heigth:"200px"}}>
        			<table className="hover stack">
        				<thead>
        					<tr>
        						<th>To</th>
        						<th>From</th>
        						<th>Subject</th>
        						<th>Created</th>
        					</tr>
        				</thead>
                <tbody>
                  {messages}
                </tbody>
        			</table>
        		</div>
  		    </div>

    		</div>
		)
	}
}
// end::message-list[]

module.exports = MessageList;
