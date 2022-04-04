var React = require('react');
var {Link, IndexLink} = require('react-router');

var FooterBar = React.createClass({
  render: function(){
    return (
      <div >
           <nav className="top-bar show-for-medium">
              <div className="top-bar-left">
                <ul className="menu">
                  <li className="topbar-title">
                    <small>@ Service Request - Camunda PoC.</small>
                  </li>
                </ul>
              </div>
           </nav>

     </div>
    );
  }
})

module.exports = FooterBar;
