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

        var damageReportKey = this.refs.pid.value;

        console.log("StartForm => handleChange: "+ JSON.stringify(damageReportKey));

        this.props.onUpdateStartState(damageReportKey);
    }

    render() {

        if (this.props.damageReports !== null){
            // console.log("Start FORM SR's: "+ JSON.stringify(this.props.damageReports));
            var options = this.props.damageReports.map(damageReport =>
                // console.log("Start FORM SR's: "+ JSON.stringify(damageReport) +" :: "+damageReport._links.self.href)
                <option key={damageReport._links.self.href} value={damageReport.damageKey}>{damageReport.damageKey}</option>
            );
        }

        return (
            <div className="my-form">

              <div className="small-8 small-offset-2 large-8 large-offset-2 columns">
                  <div className="form-registration-group">

                      <a className="form-registration-social-button" href="#" onClick={this.props.onStart}>
                          <i className="fa fa-facebook-official" aria-hidden="true"></i>Start Damage Report</a>

                        <select className="form-registration-input"
                                ref="pid"
                                onChange={this.handleChange}
                                value={this.props.damageReport.damageKey} >

                            <option defaultValue>Select Existing Damage Report</option>
                            {options}
                        </select>

                      <p className="form-registration-member-signin">Already a member? <a href="#">Sign in</a></p>
                      <p className="form-registration-terms"><a href="#">Terms &amp; Conditions</a>|<a
                          href="#">Privacy</a></p>
                    </div>
                </div>

            </div>

        );
  }
}

module.exports = StartForm;
