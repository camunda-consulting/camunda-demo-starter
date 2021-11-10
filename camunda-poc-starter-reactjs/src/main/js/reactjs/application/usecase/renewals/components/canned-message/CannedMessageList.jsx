'use strict';

// tag::vars[]
const React = require('react');

const CannedMessage = require('src/main/js/reactjs/renewals/components/canned-message/CannedMessageLine.jsx');

const FilterBar = require('src/main/js/reactjs/renewals/components/tenant/TenantFilterBar.jsx');

// tag::CannedMessage-list[]
class CannedMessageList extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
		var cannedMessages = this.props.cannedMessages.map(cannedMessage =>
			<CannedMessage key={cannedMessage._links.self.href}
        cannedMessage={cannedMessage}
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
                                   title="Canned Messages"/>
                    </div>
                </div>

                <div className="row">
  		            <div className="small-12 columns">
              			<table className="hover stack">
              				<thead>
              					<tr>
              						<th>Subject</th>
              						<th>Text</th>
              						<th>Email</th>
              					</tr>
              				</thead>
                      <tbody>
                        {cannedMessages}
                      </tbody>
              			</table>
              		</div>
        		    </div>

    		</div>
		)
	}
}
// end::CannedMessage-list[]

module.exports = CannedMessageList;
