'use strict';

// tag::vars[]
const React = require('react');

const MarketingBar = require('MarketingBar');
const FooterBar = require('FooterBar');

// tag::renewal[]
class Main extends React.Component{
    render() {
        return (
         <div className="row translucent-form-overlay">
           <div className="small-12 large-12 columns ">
           <MarketingBar/>
           <div className="columns" style={{borderBottom: "0px solid white", padding: "30px"}}></div>

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
