'use strict';

// tag::vars[]
const React = require('react');

const RenewalLine = require('src/main/js/reactjs/renewals/components/renewal/RenewalLine.jsx');

const FilterBar = require('src/main/js/reactjs/renewals/components/FilterBar.jsx');

// tag::renewal-list[]
class RenewalList extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
		var renewals = this.props.renewals.map(renewal =>
			<RenewalLine key={renewal._links.self.href}
        renewal={renewal}
		onUpdateNote={this.props.onUpdateNote}
        onSelectItem={this.props.onSelectItem}/>
		);

		return (
		    <div>
                <div className="row">
                    <div className="small-12 columns">
                        <FilterBar links={this.props.links}
                                   pageSize={this.props.pageSize}
                                   onNavigate={this.props.onNavigate}
		                           updatePageSize={this.props.updatePageSize}
                                   onFilterPriority={this.props.onFilterPriority}
                                   onFilterAll={this.props.onFilterAll}
                                   onFilterStarted={this.props.onFilterStarted}
                                   onFilterState={this.props.onFilterState}
                                   title="Renewals"/>
                    </div>
                </div>

                <div className="row">
  		            <div className="small-12 columns">
              			<table className="hover stack">
						<thead>
						<tr>
                          <th>Property</th>
						  <th width="105">End Date</th>
                          <th width="105">Show Date</th>
						  <th>Current Rent</th>
						  <th>1 Year Offer</th>
						  <th>2 Year Offer</th>
                          {/*<th>Status</th>*/}
						  <th>Process</th>
						  <th>Renewing</th>
						  <th>Note</th>
                        </tr>
						</thead>
                      <tbody>
                        {renewals}
                      </tbody>
              			</table>
              		</div>
        		    </div>

    		</div>
		)
	}
}
// end::renewal-list[]

module.exports = RenewalList;
