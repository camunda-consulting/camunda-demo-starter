/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

const React = require('react');

const ActionBar = require('SaveActionBar');

class DetailForm extends React.Component {
        
  constructor(props) {
      super(props);
        this.state = {

        };
      this.handleChange = this.handleChange.bind(this);
  }

    handleChange(event){
        event.preventDefault();

        const target = event.target;

        console.log("DetailForm -> HandleChange: "+target);

        this.props.onUpdateState(target);

    }

    render() {

        //console.log("Detail Form: "+ JSON.stringify(this.props.damageReport));

        // var responsible = "";
        // if (this.props.damageReport.responsible == null){
        //     responsible = this.props.damageReport.responsible;
        // }
        //
        // var timing = "";
        // if (this.props.damageReport.timing == null){
        //     timing = this.props.damageReport.timing;
        // }
        //
        // var counterParty = "";
        // if (this.props.damageReport.counterParty == null){
        //     counterParty = this.props.damageReport.counterParty;
        // }
        //
        // var damageType = "";
        // if (this.props.damageReport.damageType == null){
        //     damageType = this.props.damageReport.damageType;
        // }
        //
        // var location = "";
        // if (this.props.damageReport.location == null){
        //     location = this.props.damageReport.location;
        // }
        //
        // var licensePlate = "";
        // if (this.props.damageReport.licensePlate == null){
        //     licensePlate = this.props.damageReport.licensePlate;
        // }

        return (
          <div>
            <div className="my-form detail-form">

              {/*<div className="small-8 small-offset-2 large-8 large-offset-2 columns">*/}
              <div className="small-12 large-12 small-offset-1 columns" >

                <div className="small-9 large-9">
                    <div className="input-group">
                        <span className="input-group-label">License Plate</span>
                        <input className="input-group-field" type="text"
                               ref="licensePlate"
                               name="licensePlate"
                               onChange={this.handleChange}
                               value={this.props.damageReport.licensePlate} />
                    </div>
                </div>

                <div className="small-9 large-9">
                    <div className="input-group">
                        <span className="input-group-label">Responsible</span>
                        <input className="input-group-field" type="checkbox"
                               name="responsible"
                               ref="responsible"
                               onChange={this.handleChange}
                               checked={this.props.damageReport.responsible} />
                    </div>
                </div>

                    <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">Damage Type</span>
                          <select className="input-group-field"
                                  ref="damageType"
                                  name="damageType"
                                  value={this.props.damageReport.damageType}
                                  onChange={this.handleChange}>

                              <option defaultValue>Choose Damage Type</option>
                              <option value="body">Bodily Injury</option>
                              <option value="auto">Auto Damage</option>
                              <option value="other">Other</option>

                          </select>
                      </div>
                    </div>

                <div className="small-9 large-9">
                  <div className="input-group">
                    <span className="input-group-label">Accident Timing</span>
                    <select className="input-group-field"
                            ref="timing"
                            name="timing"
                            value={this.props.damageReport.timing}
                            onChange={this.handleChange}>

                        <option defaultValue>Choose Timing</option>
                        <option value="before">Before Reservation</option>
                        <option value="after">After Reservation</option>
                        <option value="during">During Reservation</option>

                    </select>
                  </div>
                </div>

                <div className="small-9 large-9">
                  <div className="input-group">
                      <span className="input-group-label"></span>
                      <textarea className="input-group-field"
                                rows="5"
                                ref="location"
                                name="location"
                                placeholder="Location of accident"
                                onChange={this.handleChange}
                                value={this.props.damageReport.location}/>
                  </div>
                </div>

              </div>

            </div>

        <ActionBar damageReport={this.props.damageReport}
                   post={this.props.post}
                   toggleForm={this.props.toggleForm}
                   onRedirect={this.props.onRedirect}/>

    </div>
    );
  }
}

module.exports = DetailForm;
