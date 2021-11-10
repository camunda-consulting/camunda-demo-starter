var React = require('react');
const client = require('../client.jsx');
const DisplayDate = require('src/main/js/reactjs/application/components/date/DisplayDate.jsx');
const follow = require('../follow.jsx'); // function to hop multiple links by "rel"

class StartForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("Start Form Component Did Mount");
    }

    componentDidUpdate() {
        console.log("Start Form Component Did Update");
    }

    handleChange(e){
        e.preventDefault();

        var orderKey = this.refs.pid.value;


        console.log("Start Form handleChange: "+ JSON.stringify(orderKey));

        this.props.onUpdateStartState(orderKey);
    }

    render() {

        // if (this.props.orders !== null){
        //     // console.log("Start FORM SR's: "+ JSON.stringify(this.props.orders));
        //     var options = this.props.orders.map(order =>
        //         // console.log("Start FORM SR's: "+ JSON.stringify(order) +" :: "+order._links.self.href)
        //         <option key={order._links.self.href} value={order.orderKey}>{order.orderKey}</option>
        //     );
        // }

        return (
            <div className="my-form">

              <div className="small-8 small-offset-2 large-8 large-offset-2 columns">
                  <div className="form-registration-group">

                      <a className="form-registration-social-button" href="#" onClick={this.props.onStart}>
                          <i className="fa fa-facebook-official" aria-hidden="true"></i>Start Onboarding</a>

                        {/*<select className="form-registration-input"*/}
                        {/*        ref="pid"*/}
                        {/*        onChange={this.handleChange}*/}
                        {/*        value={this.props.order.orderKey} >*/}

                        {/*    <option defaultValue>Select Existing Order</option>*/}
                        {/*    {options}*/}
                        {/*</select>*/}

                      {/*<p className="form-registration-member-signin">Already a member? <a href="#">Sign in</a></p>*/}
                      <p className="form-registration-terms"><a href="#">Terms &amp; Conditions</a>|<a
                          href="#">Privacy</a></p>
                    </div>
                </div>

            </div>

        );
  }
}

module.exports = StartForm;
