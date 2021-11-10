var React = require('react');
const client = require('../../usecase/service-request/components/client.jsx');

var ImportCannedMessageForm = React.createClass({
    
  handleSubmit(e){
    e.preventDefault();
    var message = {};
    message.file = this.refs.file.files[0];
    this.onCreate(message);

  },

  onCreate(message) {
    client({
            method: 'POST',
            path: "/importcannedmessage",
            entity: message,
            headers: {'Content-Type': 'multipart/form-data'}
    }).done(response => {
        alert("Canned Messages Uploaded Successfully");
    },
    response => {
       if (response.error){
            alert("Somthing went wrong "+ reponse.error)   
       }else if (response.status.code === 400) {
           alert('Bad Request: The request was not successful');
       }else if (response.status.code === 403) {
           alert('ACCESS DENIED: You are not authorized to create');
       }else{
           alert("Somthing went wrong "+ reponse.error);
       }   
    });
  },

  render: function(){
    return (
      <div className="row">
          <div className="small-12 columns">
            <form onSubmit={this.handleSubmit}>
              <label>
                Choose CSV:
                <input type="file" ref="file" />
              </label>
              <input type="submit" value="Upload" />
            </form>
          </div>
      </div>

    );
  }
})

module.exports = ImportCannedMessageForm;
