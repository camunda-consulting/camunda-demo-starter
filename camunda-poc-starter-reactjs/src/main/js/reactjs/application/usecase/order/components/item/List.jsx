/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
const Line = require('ItemLine');
const FilterBar = require('ItemFilterBar');
const ActionBar = require('ItemActionBar');
// tag::vars[]

// tag::task-list[]
class List extends React.Component{
  constructor(props) {
      super(props);
	  this.state = {
	  	group: this.props.group
	  }
	  this.toggleGroup = this.toggleGroup.bind(this)
  }

  toggleGroup(group) {
  	console.log("toggle group: "+group)
  	this.setState({
		group: group
	})
  	this.props.onFilterAll(this.props.pageSize);
  }
  render() {
		var items = this.props.items.map(item =>
			<Line key={item._links.self.href}
			    item={item}
			  	onSelectItem={this.props.onSelectItem}
			  	onUpdateItem={this.props.onUpdateItem}
				group={this.state.group}/>
		);

		return (
		    <div>
				{/*<FilterBar links={this.props.links}*/}
				{/*		   pageSize={this.props.pageSize}*/}
				{/*		   onNavigate={this.props.onNavigate}*/}
				{/*		   updatePageSize={this.props.updatePageSize}*/}
				{/*		   onFilterAll={this.props.onFilterAll}*/}
				{/*		   toggleGroup={this.toggleGroup}*/}
				{/*		   title="Filter Tasks"/>*/}

				<div className="my-form item-form">
					<table className="hover stack">
					  <thead>
						<tr>
							<th>Product</th>
							<th>PMI Code</th>
							<th>Description</th>
							<th>QR Code</th>
							<th>Quantity</th>
                        </tr>
					  </thead>
					  <tbody>
                        {items}
                      </tbody>
					</table>
				</div>

				<ActionBar order={this.props.order}
						   post={this.props.post}
						   toggleForm={this.props.toggleForm}
						   onRedirect={this.props.onRedirect}
				           items={this.props.items}
						   onRedirect={this.props.onRedirect}/>

    		</div>
		)
	}
}
// end::task-list[]

module.exports = List;
