// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom')
const IFrame = require('src/main/js/reactjs/application/components/IFrame.jsx');

// end::vars[]

class MessageDetail extends React.Component{
  constructor(props) {
      super(props);
  }

  render(){
    var content = "";
    if (this.props.message.html){
      content = this.props.message.html;
    }
    else if (this.props.message.text){
      content = this.props.message.text;
    }
    else {
      content = "No Content in message body.";
    }

    var cdate = new Date(this.props.message.created);
    var createdDate = cdate.getDate()  + "-" + (cdate.getMonth()+1) + "-" + cdate.getFullYear();

    return (
      <div>
        <div className="row">
          <div className="small-6 columns">
            <div className="card" style={{width: "300px"}}>
              <div className="card-section">
                <ul>
                  <li><span className="label">To</span><span className="data">{this.props.message.recipient}</span></li>
                  <li><span className="label">From</span><span className="data">{this.props.message.sender}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="small-6 columns">
            <div className="card" style={{width: "300px"}}>
              <div className="card-section">
                <ul>
                  <li><span className="label">Date</span><span className="data">{createdDate}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="small-12 columns">
            <div className="card">
              <div className="card-section">
                <span className="label">Subject</span>&nbsp;&nbsp;{this.props.message.subject}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="small-12 columns">
            <div className="callout clearfix">
              <IFrame content={content} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

module.exports = MessageDetail;
