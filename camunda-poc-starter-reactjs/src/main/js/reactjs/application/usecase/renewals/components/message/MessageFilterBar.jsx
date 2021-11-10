const React = require('react');
const ReactDOM = require('react-dom');
const {Link, IndexLink} = require('react-router');

class MessageFilterBar extends React.Component{

  constructor(props) {
      super(props);
      this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh(e){
    e.preventDefault();
    this.props.onRefreshMessages(this.props.renewal);
  }

  render(){
    return (
       <div className="top-bar">
         <div className="top-bar-left">
           <ul className="menu">
             <li className="menu-text">Messages</li>
           </ul>
         </div>
         <div className="top-bar-right">
           <ul className="menu">
             <a className="button small float-right" key="last" onClick={this.handleRefresh}>Refresh</a>
           </ul>
         </div>
       </div>
    )
  }
}

module.exports = MessageFilterBar;
