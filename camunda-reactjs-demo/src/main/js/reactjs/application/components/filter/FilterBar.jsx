const React = require('react');
const ReactDOM = require('react-dom');
const {Link, IndexLink} = require('react-router');

class FilterBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleToggleStartForm = this.handleToggleStartForm.bind(this);
        this.handleToggleDetailForm = this.handleToggleDetailForm.bind(this);
    }

    handleToggleStartForm(e) {
        console.log("toggling service form")
        this.props.toggleForm("start")
    }

    handleToggleDetailForm(e) {
        console.log("toggling detail form")
        this.props.toggleForm("detail")
    }


  render(){

    return (
    <div>

       <div className="top-bar my-bar">
         <div className="top-bar-left columns">
             <ul className="menu">
                <li className="topbar-title my-label">
                    {this.props.title}
                </li>
                <li>
                    <a className="button small my-button" key="service" onClick={this.handleToggleStartForm}>Start</a>
                </li>
                <li></li>
                <li>
                    <a className="button small my-button" key="detail" onClick={this.handleToggleDetailForm}>Details</a>
                </li>
              </ul>
         </div>

           <div className="top-bar-right">
               <div className="button-group small">
                   {/*<IndexLink to="/" activeClassName="active" className="button round secondary small" activeStyle={{fontWeight: 'bold'}}>Order Materials</IndexLink>*/}
                   {/*<Link to="/orders" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Orders</Link>*/}
                   {/*<Link to="/taskWorkers" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Task Worker</Link>*/}
                   {/*<Link to="/managerTasks" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Manager Approvals</Link>*/}
                   {/*<Link to="/managerReassignTasks" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Manager Reassign</Link>*/}
               </div>
           </div>

       </div>

    </div>
    )
  }
}

module.exports = FilterBar;
