/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
// tag::vars[]


class Info extends React.Component{
  constructor(props) {
      super(props);
      // this.handleDelete = this.handleDelete.bind(this);
  }

  // handleDelete(e){
  //     e.preventDefault;
  //     alert("Sure you want to delete this property? Press the [esc] button to cancel this action.");
  //     this.props.onDelete(this.props.task);
  // }
  
  render(){
      return (
          <div className="my-form">
            <div className="row">

              <div className="small-5 small-offset-1 columns">
                <div className="card" >
                  <div className="card-divider text-center">
                  {/*  <h4>Task Info</h4>*/}
                  {/*</div>*/}
                  {/*<div className="card-section" style={{borderTop: "1px dashed #2199e8"}}>*/}
                  {/*  <ul>*/}
                  {/*    <li><span className="label">Task name</span><span className="data">{this.props.task.name}</span></li>*/}
                  {/*    <li><span className="label">Task Id</span><span className="data">{this.props.task.id}</span></li>*/}
                  {/*  </ul>*/}
                  </div>
                </div>
              </div>

            </div>
          </div>
      )                 
  }
  
}
  
module.exports = Info;