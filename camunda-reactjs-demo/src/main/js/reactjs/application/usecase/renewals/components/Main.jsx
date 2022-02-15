'use strict';

// tag::vars[]
const React = require('react');

const Nav = require('src/main/js/reactjs/application/renewals/components/Nav');
const FilterBar = require('src/main/js/reactjs/application/renewals/components/FilterBar');
var MarketingBar = require('src/main/js/reactjs/application/renewals/components/MarketingBar');
var FooterBar = require('src/main/js/reactjs/application/renewals/components/FooterBar');

// tag::renewal[]
class Main extends React.Component{
    render() {
        return (
           <div>
            <MarketingBar/>
            <Nav/>
            <div className="row">
              <div className="small-12 columns">
                  {this.props.children}
              </div>
            </div>
            <FooterBar/>
          </div>
        )
    }
}
// end::renewal[]

module.exports = Main;
