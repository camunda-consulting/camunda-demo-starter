var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  render: function(){
    return (
        <div className="row">
            <div className="small-offset-2 columns">
                <div className="top-bar show-for-medium">
                    <div className="small expanded button-group">
                        <IndexLink to="/" activeClassName="active" className="button" activeStyle={{fontWeight: 'bold'}}>Service Request</IndexLink>
                        <Link to="/tenants" activeClassName="active" className="button" activeStyle={{fontWeight: 'bold'}}>Review Tasks</Link>
                        <Link to="/import" activeClassName="active" className="button" activeStyle={{fontWeight: 'bold'}}>Stuff Stuff</Link>
                    </div>
                </div>
            </div>
        </div>
    );
  }
})

module.exports = Nav;
