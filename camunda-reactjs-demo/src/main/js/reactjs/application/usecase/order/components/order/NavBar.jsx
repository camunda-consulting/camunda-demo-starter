const React = require('react');
const ReactDOM = require('react-dom');
const {Link, IndexLink} = require('react-router');

class NavBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render(){

    return (
    <div>

       <div className="top-bar my-bar">
         <div className="top-bar-left columns">
             <ul className="menu">
                 <li className="topbar-title my-label">
                     Approval Application
                 </li>
              </ul>
         </div>

           <div className="top-bar-right">
               <div className="button-group small">
                   <Link to="/tasks" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Worker Self Assign</Link>
                   <Link to="/taskWorkers" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Task Worker</Link>
                   <Link to="/managerTasks" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Manager Approvals</Link>
                   <Link to="/managerReassignTasks" activeClassName="active" className="button radius secondary small" activeStyle={{fontWeight: 'bold'}}>Manager Reassign</Link>
               </div>
           </div>

       </div>

    </div>
    )
  }
}

module.exports = NavBar;
