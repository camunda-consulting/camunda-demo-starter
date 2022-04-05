'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom')
const {Route, Router, IndexRoute, hashHistory, b} = require('react-router');
const Parent = require('Parent');
const Main = require('Main');
const Workflow = require('WorkflowMain');
const TaskMain = require('TaskMain')

// tag::styles[]
require('style!css!foundation-sites/dist/foundation.css');
$(document).foundation();
// end::styles[]

// tag::render[]
ReactDOM.render(
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Parent}/>
          <Route path="tasks" component={TaskMain}/>
          <Route path="task/:key" component={Workflow}/>
        </Route>
      </Router>,
      document.getElementById('react')
)
// end::render[]
