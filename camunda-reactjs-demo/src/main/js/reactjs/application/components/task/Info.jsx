/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
import {startWith, switchMap} from "rxjs/operators";
import {interval} from "rxjs";

const apiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}:${process.env.DATA_API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;

const React = require('react');

// tag::customComponents
// tag::vars[]


class Info extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false,
      }

  }


    render(){

      return (
          <div className="my-form my-info">
            <div className="row">

              <div className="small-5 small-offset-1 columns">
                <div className="card" >
                  <div className="card-divider text-center">
                    <h4>Task Info</h4>
                  </div>
                  <div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>
                    <ul>
                      <li><span className="label">Task name</span><span className="data">{this.props.task.name}</span></li>
                      <li><span className="label">Task Id</span><span className="data">{this.props.task.id}</span></li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
        </div>
      )                 
  }
  
}
  
module.exports = Info;