'use strict';

// tag::vars[]
const React = require('react');

const Tenant = require('src/main/js/reactjs/renewals/components/tenant/TenantLine.jsx');

const FilterBar = require('src/main/js/reactjs/renewals/components/tenant/TenantFilterBar.jsx');

// tag::Tenant-list[]
class TenantList extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
		var tenants = this.props.tenants.map(tenant =>
			<Tenant key={tenant._links.self.href}
        tenant={tenant}
        onSelectItem={this.props.onSelectItem}
	    onDelete={this.props.onDelete}/>
		);

		return (
		    <div>
                <div className="row">
                    <div className="small-12 columns">
                        <FilterBar links={this.props.links}
                                   pageSize={this.props.pageSize}
                                   onNavigate={this.props.onNavigate}
                                   updatePageSize={this.props.updatePageSize}
                                   title="Tenants"/>
                    </div>
                </div>

                <div className="row">
  		            <div className="small-12 columns">
              			<table className="hover stack">
              				<thead>
              					<tr>
              						<th>Name</th>
              						<th>Email</th>
              						<th>Unit Slug</th>
              					</tr>
              				</thead>
                      <tbody>
                        {tenants}
                      </tbody>
              			</table>
              		</div>
        		    </div>

    		</div>
		)
	}
}
// end::Tenant-list[]

module.exports = TenantList;
