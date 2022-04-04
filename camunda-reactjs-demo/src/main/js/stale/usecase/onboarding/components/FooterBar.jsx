var React = require('react');
var {Link, IndexLink} = require('react-router');

var FooterBar = React.createClass({
  render: function(){
    return (
      <div>
          <div className="columns small-offset-5">
                <small>@Mediny PoC.</small>
          </div>
     </div>
    );
  }
})

module.exports = FooterBar;
