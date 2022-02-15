// tag::vars[]
const React = require('react');
// end::vars[]

class Tenant extends React.Component{
  constructor(props) {
      super(props);
  }

  render(){
    return (
      <div>
        <div>
          <ul>
            <li><span className="label">Name</span>&nbsp;{this.props.tenant.name}&nbsp;&nbsp;<span className="label">EMail</span>&nbsp;{this.props.tenant.email}</li>
          </ul>
        </div>
      </div>
    )
  }
}

module.exports = Tenant;
