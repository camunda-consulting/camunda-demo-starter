/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');

// tag::customComponents
const Line = require('src/main/js/reactjs/application/service-request/components/task/Line.jsx');
const FilterBar = require('src/main/js/reactjs/application/service-request/components/task/FilterBar.jsx');

// tag::vars[]

// tag::task-list[]
class List extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
		var tasks = this.props.tasks.map(task =>
			<Line key={task._links.self.href}
				task={task}
			  	onSelectItem={this.props.onSelectItem}/>
		);

		return (
		    <div>
				<FilterBar links={this.props.links}
						   pageSize={this.props.pageSize}
						   onNavigate={this.props.onNavigate}
						   updatePageSize={this.props.updatePageSize}
						   onFilterPriority={this.props.onFilterPriority}
						   onFilterAll={this.props.onFilterAll}
						   onFilterStarted={this.props.onFilterStarted}
						   onFilterState={this.props.onFilterState}
						   title="Filter Tasks"/>

				<div>
					<table className="hover stack">
					  <thead>
						<tr>
							<th>Task Name</th>
							<th>Service Owner</th>
							<th width="105">Sourcing Manager</th>
							<th width="105">Service Description</th>
							<th>Acquiring Division</th>
							<th>Service Category</th>
							<th>Sourcing Comments</th>
							<th>Service Id</th>
                        </tr>
					  </thead>
					  <tbody>
                        {tasks}
                      </tbody>
					</table>
				</div>

    		</div>
		)
	}
}
// end::task-list[]

module.exports = List;
