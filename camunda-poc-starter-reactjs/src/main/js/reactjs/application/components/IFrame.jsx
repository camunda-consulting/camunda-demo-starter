var React =  require('react');
var ReactDOM = require('react-dom');

var IFrame = React.createClass({

  updateIFrameContents(){
    var frameBody = ReactDOM.findDOMNode(this).contentDocument.body;
    frameBody.innerHTML = this.props.content;
  },

  componentDidMount: function() {
    this.updateIFrameContents();
  },

  componentDidUpdate: function() {
     this.updateIFrameContents();
  },

  render: function() {
     return (
         <iframe style={{borderStyle: "none", width: "100%", height: "250px"}} />
     );
  },

});

module.exports = IFrame;
