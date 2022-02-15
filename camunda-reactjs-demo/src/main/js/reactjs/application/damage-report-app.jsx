'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom')
const {Route, Router, IndexRoute, hashHistory, b} = require('react-router');
const Main = require('Main');
const Home = require('Home');
const TaskHome = require('TaskHome');

// tag::styles[]
require('style!css!foundation-sites/dist/foundation.css');
$(document).foundation();
// end::styles[]

// tag::render[]
ReactDOM.render(
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Home}/>
          <Route path="task/:key" component={TaskHome}/>
        </Route>
      </Router>,
      document.getElementById('react')
)
// end::render[]
