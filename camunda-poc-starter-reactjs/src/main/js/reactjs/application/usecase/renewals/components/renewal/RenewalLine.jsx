'use strict';

var {Link, IndexLink} = require('react-router');

// tag::vars[]
const React = require('react');
const DisplayDate = require('src/main/js/reactjs/renewals/components/date/DisplayDate.jsx');
const UpdateNoteDialog = require('src/main/js/reactjs/renewals/components/note/UpdateNoteDialog.jsx');

// tag::renewal[]
class RenewalLine extends React.Component{

  constructor(props) {
      super(props);
  }

  render() {
    var status = "Not Started";
    if (this.props.renewal.renewalStarted){
      status = "Renewal Started";
    }
    if (this.props.renewal.renewalCompleted){
      status = "Renewal Completed"
    }
    var renewing = "";
    if (this.props.renewal.renewing){
        renewing = "Yes";
    }else if(this.props.renewal.renewing === false && this.props.renewal.renewalCompleted){
        renewing = "No";
    }
        
      return (
          <tr >
            <td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}>{this.props.renewal.property}</td>
            <td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}><DisplayDate date={this.props.renewal.end} /></td>
            <td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}><DisplayDate date={this.props.renewal.showDate} /></td>
            <td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}>{this.props.renewal.currentRent}</td>
            <td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}>{this.props.renewal.oneYearOffer}</td>
            <td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}>{this.props.renewal.twoYearOffer}</td>
            {/*<td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}>{status}</td>*/}
            <td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}>{this.props.renewal.workflowState}</td>
            <td onClick={this.props.onSelectItem.bind(null, this.props.renewal)}>{renewing}</td>
            <td>
                <UpdateNoteDialog renewal={this.props.renewal}
                  onUpdateNote={this.props.onUpdateNote}/>
            </td>
          </tr>
      )
  }
}
// end::renewal[]

module.exports = RenewalLine;
