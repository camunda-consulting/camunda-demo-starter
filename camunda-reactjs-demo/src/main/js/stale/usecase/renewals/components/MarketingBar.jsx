var React = require('react');
var {Link, IndexLink} = require('react-router');

var MarketingBar = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="large-12 columns">
           <nav className="top-bar show-for-medium">
              <div className="top-bar-left">
                <ul className="menu">
                  <li className="topbar-title">
                    Camunda PoC
                  </li>
                </ul>
              </div>
           </nav>
       </div>
     </div>
    );
  }
})

module.exports = MarketingBar;
