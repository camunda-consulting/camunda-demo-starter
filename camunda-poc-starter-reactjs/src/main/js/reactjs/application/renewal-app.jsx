'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom')
const {Route, Router, IndexRoute, hashHistory} = require('react-router');
const Main = require('Main');
const RenewalMain = require('./usecase/renewals/components/renewal/RenewalMain');
const TenantMain = require('./usecase/renewals/components/tenant/TenantMain');
const Import = require('./usecase/renewals/components/import/Import');
const RenewalDetail = require('./usecase/renewals/components/renewal/RenewalDetail');
const TenantDetail = require('./usecase/renewals/components/tenant/TenantDetail');
const CannedMessageMain = require('./usecase/renewals/components/canned-message/CannedMessageMain');

// tag::styles[]
require('style!css!foundation-sites/dist/foundation.css');
$(document).foundation();

//require('style!css!../../main/resources/static/app.css');
// end::styles[]

// tag::render[]
ReactDOM.render(
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={RenewalMain}/>
          <Route path="renewal" component={RenewalDetail}/>
          <Route path="tenants" component={TenantMain}/>
          <Route path="tenant" component={TenantDetail}/>
          <Route path="cannedMessages" component={CannedMessageMain}/>
          <Route path="import" component={Import}/>
        </Route>
      </Router>,
      document.getElementById('react')
)
// end::render[]
