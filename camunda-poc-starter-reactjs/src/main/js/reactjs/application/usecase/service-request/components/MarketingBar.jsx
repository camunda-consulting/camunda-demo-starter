var React = require('react');
var {Link, IndexLink} = require('react-router');
const Nav = require('src/main/js/reactjs/application/service-request/components/Nav');

var MarketingBar = React.createClass({
  render: function(){
    return (
      <div>
        <div className="title-bar" data-responsive-toggle="realEstateMenu" data-hide-for="small">
            {/*<button className="menu-icon" type="button" data-toggle></button>*/}
            {/*<div className="title-bar-title">Menu</div>*/}

          <div className="title-bar-left">
              <ul className="menu">
                  <li className="menu-text">
                      <button className="menu-icon" type="button" data-toggle></button>
                      {/*<div className="title-bar-title">Insurance Application - Camunda - PoC</div>*/}
                      <medium>SR</medium>
                  </li>
                  <li className="menu-text">
                      {/*<span className="title-bar-title"><img src="logo.png?text=MorganStanley"/></span>*/}
                  </li>
              </ul>
          </div>

          <div className="title-bar-right my-title-bar-right">
            <ul className="menu">
                <li><a href="#">My Account</a></li>
                <li><a className="button">Login</a></li>
            </ul>
          </div>
        </div>

        <div className="top-bar" >
          <div className="small-4 large-6 columns top-bar-right">
              <div className="button-group">
                <IndexLink to="/" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Questionnaire</IndexLink>
                <Link to="/tasks" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Review Tasks</Link>
                <IndexLink to="/rejected" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Rejected</IndexLink>
              </div>
          </div>
        </div>

        <div className="columns" style={{borderBottom: "1px solid white"}}></div>

      </div>
    );
  }
})

module.exports = MarketingBar;
