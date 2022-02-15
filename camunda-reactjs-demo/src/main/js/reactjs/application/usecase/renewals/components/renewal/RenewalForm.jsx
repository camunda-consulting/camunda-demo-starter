var React = require('react');
const client = require('../client.jsx');
const DisplayDate = require('src/main/js/reactjs/renewals/components/date/DisplayDate.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

class RenewalForm extends React.Component {
        
  constructor(props) {
    super(props);
    this.state = {
      signed: this.props.renewal.signed,
      renewing: this.props.renewal.renewing

    };
    this.handleSignedCheck = this.handleSignedCheck.bind(this);
    this.handleRenewedCheck = this.handleRenewedCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }  
  
  handleSubmit(e){
    e.preventDefault();
    debugger
    var message = {};
    message.text = this.refs.newMessage.value;
    message.subject = this.refs.cannedMessage.value;
    if(this.refs.gracePeriod.value){
      message.gracePeriod = this.refs.gracePeriod.value;
    }
    message.confirm = false;
    if (this.refs.confirm.checked){
      message.confirm = true;
    }
//    message.signed = false;
//    if (this.refs.signed.checked){
//      message.signed = true;
//    }
//    message.renewing = false;
//    if (this.refs.renewing.checked){
//      message.renewing = true;
//    }
    message.processId = this.props.renewal.businessKey;
    message.renewalId = this.props.renewal.id;
    this.onCreate(message);

    // clear out the dialog's inputs
    this.refs.newMessage.value = '';
  }

  setMessage(e){
    e.preventDefault();
        
    var sdate = new Date(this.props.renewal.showDate);
    var showDate = (sdate.getMonth()+1) + "-" + sdate.getDate()  + "-" + sdate.getFullYear();

    this.refs.newMessage.value = "";
    var selection = this.refs.cannedMessage.value;
    if (selection !== ""){
        this.refs.newMessage.value = this.props.cannedMessages[selection].text;        
    }
  }  

  onCreate(message) {
      client({
              method: 'POST',
              path: "/message",
              entity: message,
              headers: {'Content-Type': 'multipart/form-data'}
      }).done(response => {
          alert("Message Sent");
      });
  }
  
  handleSignedCheck(e){
    e.preventDefault();
    var message = {};
    message.signed = false;
    if (this.refs.signed.checked){
      message.signed = true;
    }
    message.processId = this.props.renewal.processId;
    message.renewalId = this.props.renewal.id;
    
    this.onUpdateSigned(message);
  }

  onUpdateSigned(message) {
       client({
               method: 'POST',
               path: "/signed",
               entity: message,
               headers: {'Content-Type': 'multipart/form-data'}
       }).done(response => {
           alert("Renewal Signed flag has been updated!");
           this.setState({
               signed: message.signed
           });
       });
    }
    


  

  handleRenewedCheck(e){
    e.preventDefault();
    var message = {};
    message.renewing = false;
    if (this.refs.renewing.checked){
      message.renewing = true;
    }
    message.processId = this.props.renewal.processId;
    message.renewalId = this.props.renewal.id;
    
    this.onUpdateRenewing(message);
  }
  
  onUpdateRenewing(message) {
      client({
              method: 'POST',
              path: "/renewing",
              entity: message,
              headers: {'Content-Type': 'multipart/form-data'}
      }).done(response => {
          alert("Renewal Renewing flag has been updated!");
          this.setState({
              renewing: message.renewing
          });
      });
   }
   

  
  render() {
    var i = 0;  
    var options = this.props.cannedMessages.map(cannedMessage =>
        <option key={cannedMessage._links.self.href} value={i++}>{cannedMessage.subject}</option>
    );  
      
    return (
      <div className="row">
          <div className="small-12 columns">
            <form onSubmit={this.handleSubmit}>
              <select ref="cannedMessage" onChange={this.setMessage} defaultValue="">
                <option value="">Choose a canned message</option>
                {options}
              </select>
              <textarea rows="5" ref="newMessage" placeholder="Enter Message to tenants"/>
                
              <div className="row">
                <div className="small-5 columns">
                  <div className="input-group">
                    <span className="input-group-label">Grace Period</span>
                    <select className="input-group-field" ref="gracePeriod" defaultValue="">
                      <option value="">Default</option>
                      <option value="1">1 Day</option>
                      <option value="2">2 Days</option>
                      <option value="3">3 Days</option>
                      <option value="5">5 Days</option>
                    </select>
                  </div>
                </div>
                <div className="small-3 columns">
                  <div className="input-group">
                    <span className="input-group-label">Renewing</span>
                    <input className="input-group-field" type="checkbox" ref="renewing" checked={this.state.renewing} onChange={this.handleRenewedCheck}/>
                  </div>
                </div>

{/*                <div className="small-2 columns">
//                    <div className="input-group">
//                      <span className="input-group-label">Signed</span>
//                      <input className="input-group-field" type="checkbox" ref="signed" checked={this.state.signed} onChange={this.handleSignedCheck} />
//                    </div>
//                </div>
*/}
                <div className="small-3 columns">
                  <div className="input-group">
                    <span className="input-group-label">Confirm</span>
                    <input className="input-group-field" type="checkbox" ref="confirm" />
                  </div>
                </div>
                <div className="small-1 columns">
                  <label htmlFor="sendMessage" className="button float-right">Send</label>
                  <input type="submit" id="sendMessage" className="show-for-sr" />
                </div>
              </div>
            </form>
          </div>
      </div>

    );
  }
}

module.exports = RenewalForm;
