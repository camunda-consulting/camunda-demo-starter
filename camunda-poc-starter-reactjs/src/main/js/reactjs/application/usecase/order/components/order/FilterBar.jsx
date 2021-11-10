/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');
const ReactDOM = require('react-dom');
const {Link, IndexLink} = require('react-router');

// tag::vars[]


class FilterBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleFilterQueue = this.handleFilterQueue.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    // tag::handle-page-size-updates[]
    handleInput(e) {
        e.preventDefault();
        var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length - 1);
        }
    }
    // end::handle-page-size-updates[]

    handleRefresh(e){
      e.preventDefault();
      this.state.callUpdate(this.props.pageSize, this);
    }

    handleFilterQueue(e){
      e.preventDefault();
      console.log("filterbar tasks: "+this.refs.queue.value)
      this.props.toggleGroup(this.refs.queue.value);
    }

    // tag::handle-nav[]
    handleNavFirst(e){
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }
    // end::handle-nav[]

  render(){
      var navLinks = [];
      if ("first" in this.props.links) {
          navLinks.push(<a className="my-button button small" key="first" onClick={this.handleNavFirst}>&lt;&lt;</a>);
      }
      if ("prev" in this.props.links) {
          navLinks.push(<a className="my-button button small" key="prev" onClick={this.handleNavPrev}>&lt;</a>);
      }
      if ("next" in this.props.links) {
          navLinks.push(<a className="my-button button small" key="next" onClick={this.handleNavNext}>&gt;</a>);
      }
      if ("last" in this.props.links) {
          navLinks.push(<a className="my-button button small" key="last" onClick={this.handleNavLast}>&gt;&gt;</a>);
      }

    return (
    <div>

       <div className="top-bar my-task-filter-bar">
         <div className="top-bar-left">
              <ul className="menu">
                  <li className="menu-text">{this.props.title}</li>
              </ul>
         </div>
         <div className="top-bar-left">
             <ul className="menu">
                  <li>
                    <div className="input-group small">
                        <span className="input-group-label">Queue Filter</span>
                        <select ref="queue" className="input-group-field"
                                onClick={this.handleFilterQueue}>

                            <option defaultValue>Select Queue</option>
                            <option value="queue0">queue 0</option>
                            <option value="queue1">queue 1</option>
                            <option value="queue2">queue 2</option>
                        </select>
                    </div>
                  </li>
              </ul>
         </div>

         <div className="top-bar-right">
          <ul className="menu">
              <li>
                  <div className="button-group small">
                      {navLinks}
                  </div>
              </li>
            <li>
                <div className="input-group small">
                    <span className="input-group-label">Page Size</span>
                    <input style={{width: "70px"}} type="number" ref="pageSize"
                      defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                </div>
            </li>
            <li>
              <div className="button-group small">
                  <a className="button secondary radius" key="last" onClick={this.handleRefresh}>Refresh</a>
              </div>
            </li>
          </ul>
         </div>
       </div>

    </div>
    )
  }
}

module.exports = FilterBar;
