const React = require('react');
const ReactDOM = require('react-dom');

const {Link, IndexLink} = require('react-router');

class FilterBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleToggleStartForm = this.handleToggleStartForm.bind(this);
        this.handleToggleServiceForm = this.handleToggleServiceForm.bind(this);
        this.handleToggleDetailForm = this.handleToggleDetailForm.bind(this);
        this.handleToggleSupplierForm = this.handleToggleSupplierForm.bind(this);
    }

    handleToggleStartForm(e) {
        console.log("toggling service form")
        this.props.toggleForm("start")
    }

    handleToggleServiceForm(e) {
        console.log("toggling service form")
        this.props.toggleForm("service")
    }

    handleToggleDetailForm(e) {
        console.log("toggling detail form")
        this.props.toggleForm("detail")    }

    handleToggleSupplierForm(e) {
        console.log("toggling supplier form")
        this.props.toggleForm("supplier")
    }


  render(){

    return (
    <div>

       <div className="top-bar">
         {/*<div className="small-2 large-2 columns">*/}
         {/*  <div className="button-group small">*/}
         {/*     <a className="button secondary" >Back</a>*/}
         {/*     <a className="button small" >Next</a>*/}
         {/*  </div>*/}
         {/*</div>*/}
         <div className="top-bar-left">
             <ul className="menu">
                <li>
                 <a key="service" onClick={this.handleToggleStartForm}>Start</a>
                </li>
                <li>
                 |
                </li>
                <li>
                  <a key="service" onClick={this.handleToggleServiceForm}>Service</a>
                </li>
                <li>
                   |
                </li>
                <li>
                  <a key="detail" onClick={this.handleToggleDetailForm}>Details</a>
                </li>
                <li>
                   |
                </li>
                <li>
                  <a key="supplier" onClick={this.handleToggleSupplierForm}>Supplier</a>
                </li>
              </ul>
         </div>
       </div>

    </div>
    )
  }
}

module.exports = FilterBar;
