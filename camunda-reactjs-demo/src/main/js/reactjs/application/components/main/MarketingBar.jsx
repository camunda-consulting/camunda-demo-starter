const {Link, IndexLink} = require('react-router');
const React = require('react');

var MarketingBar = React.createClass({
  render: function(){
    return (
      <div>
        <div className="title-bar" data-responsive-toggle="realEstateMenu" data-hide-for="small">

            <div className="title-bar-left">
                <ul className="menu">
                    <li className="menu-text">
                        <span className="title-bar-title"><img src="https://camunda.com/wp-content/uploads/2020/06/favicon.png?text=Camunda"/></span>
                    </li>
                    <li className="menu-text">
                        {/*<button className="menu-icon" type="button" data-toggle></button>*/}
                        {/*<div className="title-bar-title">Insurance Application - Camunda - PoC</div>*/}
                        {/*<large>PoC</large>*/}
                    </li>
                </ul>
            </div>
            <div className="title-bar-right my-title-bar-right">
                <ul className="menu">
                    <li>
                        <Link to="/tasks" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Tasks</Link>
                    </li>
                    <li>
                        <IndexLink to="/" activeClassName="active" className="button round small" activeStyle={{fontWeight: 'bold'}}>My Account</IndexLink>
                        {/*<a className="button small">My Account</a>*/}
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/tasks" activeClassName="active" className="button radius small" activeStyle={{fontWeight: 'bold'}}>Login</Link>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </div>

      </div>
    );
  }
})

module.exports = MarketingBar;
