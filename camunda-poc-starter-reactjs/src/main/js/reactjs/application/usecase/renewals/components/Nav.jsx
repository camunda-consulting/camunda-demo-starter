var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  render: function(){
    return (
        <div className="row">
            <div className="small-12 columns">
                <div className="top-bar show-for-medium">
                    <div className="medium expanded button-group">
                        <IndexLink to="/" activeClassName="active" className="hollow button" activeStyle={{fontWeight: 'bold'}}>Renewals</IndexLink>
                        <Link to="/tenants" activeClassName="active" className="hollow button" activeStyle={{fontWeight: 'bold'}}>Tenants</Link>
                        <Link to="/import" activeClassName="active" className="hollow button" activeStyle={{fontWeight: 'bold'}}>Import</Link>
                    </div>
                </div>
            </div>
        </div>
    );
  }
})

module.exports = Nav;
