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
          callUpdate: function (pageSize, that) {that.props.onFilterAll(pageSize)}
        };
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handlefilterState = this.handlefilterState.bind(this);
        this.handleFilterPriority = this.handleFilterPriority.bind(this);
        this.handleFilterAll = this.handleFilterAll.bind(this);
        this.handleFilterStarted = this.handleFilterStarted.bind(this);
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

    handleFilterPriority(e){
      e.preventDefault();
      this.props.onFilterPriority(this.props.pageSize);
      this.setState({
        callUpdate: function (pageSize, that) {that.props.onFilterPriority(pageSize)}
      });
    }

    handleFilterAll(e){
      e.preventDefault();
      this.props.onFilterAll(this.props.pageSize);
      this.setState({
        callUpdate: function (pageSize, that) {that.props.onFilterAll(pageSize)}
      });
    }

    handleFilterStarted(e){
      e.preventDefault();
      this.props.onFilterStarted(this.props.pageSize);
      this.setState({
        callUpdate: function (pageSize, that) {that.props.onFilterStarted(pageSize)}
      });
    }

    handlefilterState(e){
      e.preventDefault();
      this.props.onFilterState(this.props.pageSize);
      this.setState({
        callUpdate: function (pageSize, that) {that.props.onFilterState(pageSize)}
      });
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
          navLinks.push(<a className="button" key="first" onClick={this.handleNavFirst}>&lt;&lt;</a>);
      }
      if ("prev" in this.props.links) {
          navLinks.push(<a className="button" key="prev" onClick={this.handleNavPrev}>&lt;</a>);
      }
      if ("next" in this.props.links) {
          navLinks.push(<a className="button" key="next" onClick={this.handleNavNext}>&gt;</a>);
      }
      if ("last" in this.props.links) {
          navLinks.push(<a className="button" key="last" onClick={this.handleNavLast}>&gt;&gt;</a>);
      }

    return (
    <div>

       <div className="top-bar">
         <div className="top-bar-left">
              <ul className="menu">
                  <li className="menu-text">{this.props.title}</li>
              </ul>
         </div>
         {/*<div className="top-bar-left">*/}
         {/*    <ul className="menu">*/}
         {/*         <li>*/}
         {/*               <label className="text-center">Filter</label>*/}
         {/*               <select onClick={this.handleFilterAll}>*/}
         {/*                   <option defaultValue>Select</option>*/}
         {/*                   <option>option 1</option>*/}
         {/*                   <option>option 2</option>*/}
         {/*                   <option>option 3</option>*/}
         {/*               </select>*/}
         {/*         </li>*/}
         {/*         <li>*/}
         {/*             <label className="text-center">Filter</label>*/}
         {/*             <select onClick={this.handleFilterAll}>*/}
         {/*                 <option defaultValue>Select</option>*/}
         {/*                 <option>option 1</option>*/}
         {/*                 <option>option 2</option>*/}
         {/*                 <option>option 3</option>*/}
         {/*             </select>*/}
         {/*         </li>*/}
         {/*         <li>*/}
         {/*             <label className="text-center">Filter</label>*/}
         {/*             <select onClick={this.handleFilterAll}>*/}
         {/*                 <option defaultValue>Select</option>*/}
         {/*                 <option>option 1</option>*/}
         {/*                 <option>option 2</option>*/}
         {/*                 <option>option 3</option>*/}
         {/*             </select>*/}
         {/*         </li>*/}
         {/*     </ul>*/}
         {/*</div>*/}

         <div className="top-bar-right">
          <ul className="menu">
              {/*<li>*/}
              {/*    <div className="button-group small">*/}
              {/*        {navLinks}*/}
              {/*    </div>*/}
              {/*</li>*/}
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
