var React =  require('react');
var ReactDOM = require('react-dom');

var DisplayDate = React.createClass({

  render: function() {
    var newDate = "";
    if (this.props.date !== null){
      var sdate = new Date(this.props.date);
      newDate = (sdate.getMonth()+1) + "-" + sdate.getDate()  + "-" + sdate.getFullYear();
    }

   return (
       <span>{newDate}</span>
   );
  },

});

module.exports = DisplayDate;
