/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

var React = require('react');

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

        var key = this.refs.pid.value;

        console.log("StartForm => handleChange: "+ JSON.stringify(key));

        this.props.onUpdateStartState(key);
    }

    render() {

        if (this.props.submissions !== null){
            // console.log("Start FORM SR's: "+ JSON.stringify(this.props.submissions));
            var options = this.props.submissions.map(submission =>
                // console.log("Start FORM SR's: "+ JSON.stringify(submission) +" :: "+submission._links.self.href)
                <option key={submission._links.self.href} value={submission.key}>{submission.key}</option>
            );
        }

        return (
              <div className="form-registration-group">
                  <a className="form-registration-social-button" href="#" onClick={this.props.onStart}>
                      <i className="fa fa-facebook-official" aria-hidden="true"></i>Start Submission</a>

                    <select className="form-registration-input"
                            ref="pid"
                            onChange={this.handleChange}
                            value={this.props.submission.key} >

                        <option defaultValue>Select Existing Case</option>
                        {options}
                    </select>

                  <p className="form-registration-member-signin">Already a member? <a href="#">Sign in</a></p>
                  <p className="form-registration-terms"><a href="#">Terms &amp; Conditions</a>|<a
                      href="#">Privacy</a></p>
                </div>
        );
  }
}

module.exports = StartForm;
