// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom')
const client = require('../client.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

const MessageList = require('src/main/js/reactjs/renewals/components/message/MessageList.jsx');
const MessageDetail = require('src/main/js/reactjs/renewals/components/message/MessageDetail.jsx');
const RenewalForm = require('src/main/js/reactjs/renewals/components/renewal/RenewalForm.jsx');
const Tenant = require('src/main/js/reactjs/renewals/components/tenant/Tenant.jsx');
const RenewalInfo = require('src/main/js/reactjs/renewals/components/renewal/RenewalInfo.jsx');
const RenewalLine = require('src/main/js/reactjs/renewals/components/renewal/RenewalLine.jsx');

// end::vars[]

class RenewalDetail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        message: null,
        messages: [],
        attributes: [],
        pageSize: 2,
        links: {},
        displayDetail: "none",
        displayList: "block"
      };
      this.updatePageSize = this.updatePageSize.bind(this);
      this.handleSelectedItem = this.handleSelectedItem.bind(this);
      this.handleBackClick = this.handleBackClick.bind(this);
  }

  // tag::update-page-size[]
  updatePageSize(pageSize) {
      if (pageSize !== this.state.pageSize) {
          this.loadFromServer(pageSize);
      }
  }
  // end::update-page-size[]

  handleSelectedItem(message){
    this.setState({
      message: message,
      displayDetail: "block",
      displayList: "none"
    });
  }

  handleBackClick(e){
    this.setState({
      displayDetail: "none",
      displayList: "block"
    });
  }

  render(){
    var item = "";
    if (this.state.message !== null) {
      item = <MessageDetail message={this.state.message}/>
    }
    var displayForm = this.props.displayForm;
    var displayMessages = this.props.displayMessages;

    var tenants = this.props.renewal.tennants.map(tenant =>
        <Tenant key={tenant.email}
            tenant={tenant}/>
    );

    return (
      <div>

        <div style={{display: this.props.displayLine}}>
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
                                <th>State</th>
                                <th>Renewing</th>
                                <th>Note</th>
                             </tr>
                        </thead>
                        <tbody>
                            <RenewalLine key={this.props.renewal._links.self.href}
                                renewal={this.props.renewal}
                                onUpdateNote={this.props.onUpdateNote}
                                onSelectItem={this.props.onSelectItem}/>
                        </tbody>
                    </table>
                </div>
            </div>    
        </div>
                                
        <div style={{display: this.props.displayInfo}}>
            <RenewalInfo
                tenants={tenants}
                renewal={this.props.renewal}
                onUpdateNote={this.props.onUpdateNote}
                onDelete={this.props.onDelete}/>
        </div>
                            
        <div style={{display: displayMessages}}>
          <hr />
          <div style={{display: this.state.displayList}}>
              <MessageList messages={this.props.messages}
                  renewal={this.props.renewal}
                  links={this.state.links}
                  pageSize={this.state.pageSize}
                  onNavigate={this.onNavigate}
                  updatePageSize={this.updatePageSize}
                  onSelectItem={this.handleSelectedItem}
                  onRefreshMessages={this.props.onRefreshMessages}/>
          </div>
          <div style={{display: this.state.displayDetail}}>
            <div className="top-bar show-for-medium small-12 columns">
             <div className="top-bar-left">
               <ul className="menu">
                 <li className="topbar-title">
                   Message Detail
                 </li>
               </ul>
             </div>
             <div className="top-bar-right">
               <ul className="menu">
                 <li className="topbar-title">
                   <a className="button" onClick={this.handleBackClick}>&lt;&lt;&lt;Back</a>
                 </li>
               </ul>
             </div>
            </div>
            <div className="row">
                <div className="small-12 columns">
                  {item}
                </div>
            </div>
          </div>
        </div>
                  
        <div style={{display: displayForm}}>
          <hr />
          <RenewalForm renewal={this.props.renewal}
                   cannedMessages={this.props.cannedMessages}/>
        </div>

      </div>
    )
  }
}

module.exports = RenewalDetail;
