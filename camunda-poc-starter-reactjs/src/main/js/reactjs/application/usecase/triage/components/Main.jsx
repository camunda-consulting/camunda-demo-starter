'use strict';

// tag::vars[]
const React = require('react');

const FilterBar = require('FilterBar');
var MarketingBar = require('src/main/js/reactjs/application/usecase/triage/components/MarketingBar');
var StatusBar = require('src/main/js/reactjs/application/usecase/triage/components/StatusBar');
var FooterBar = require('src/main/js/reactjs/application/usecase/triage/components/FooterBar');

// tag::renewal[]
class Main extends React.Component{
    render() {
        return (
         <div className="row translucent-form-overlay">
           <div className="small-12 large-12 columns">
            <MarketingBar/>
            <StatusBar/>
            <div>
              {this.props.children}
            </div>
            <FooterBar/>
          </div>
         </div>
        )
    }
}
// end::renewal[]

module.exports = Main;
