/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

const React = require('react');

const ConfirmAction = require('ConfirmAction');

class ConfirmationForm extends React.Component {
        
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

        //console.log("Confirmation Form: "+ JSON.stringify(this.props.submission));

        // var responsible = "";
        // if (this.props.submission.responsible == null){
        //     responsible = this.props.submission.responsible;
        // }
        //
        // var timing = "";
        // if (this.props.submission.timing == null){
        //     timing = this.props.submission.timing;
        // }
        //
        // var counterParty = "";
        // if (this.props.submission.counterParty == null){
        //     counterParty = this.props.submission.counterParty;
        // }
        //
        // var damageType = "";
        // if (this.props.submission.damageType == null){
        //     damageType = this.props.submission.damageType;
        // }
        //
        // var location = "";
        // if (this.props.submission.location == null){
        //     location = this.props.submission.location;
        // }
        //
        // var licensePlate = "";
        // if (this.props.submission.licensePlate == null){
        //     licensePlate = this.props.submission.licensePlate;
        // }

        return (
          <div>
            <div className="my-form detail-form">

              {/*<div className="small-8 small-offset-2 large-8 large-offset-2 columns">*/}
              {/*<div className="small-12 large-12 small-offset-1 columns" >*/}

              {/*  <div className="small-9 large-9">*/}
              {/*      <div className="input-group">*/}
              {/*          <span className="input-group-label">License Plate</span>*/}
              {/*          <input className="input-group-field" type="text"*/}
              {/*                 ref="licensePlate"*/}
              {/*                 name="licensePlate"*/}
              {/*                 onChange={this.handleChange}*/}
              {/*                 value={this.props.submission.licensePlate}*/}
              {/*                 disabled/>*/}
              {/*      </div>*/}
              {/*  </div>*/}

              {/*  <div className="small-9 large-9">*/}
              {/*      <div className="input-group">*/}
              {/*          <span className="input-group-label">Responsible</span>*/}
              {/*          <input className="input-group-field" type="checkbox"*/}
              {/*                 name="responsible"*/}
              {/*                 ref="responsible"*/}
              {/*                 onChange={this.handleChange}*/}
              {/*                 checked={this.props.submission.responsible}*/}
              {/*                 disabled/>*/}
              {/*      </div>*/}
              {/*  </div>*/}

              {/*      <div className="small-9 large-9">*/}
              {/*        <div className="input-group">*/}
              {/*            <span className="input-group-label">Damage Type</span>*/}
              {/*            <select className="input-group-field"*/}
              {/*                    ref="damageType"*/}
              {/*                    name="damageType"*/}
              {/*                    value={this.props.submission.damageType}*/}
              {/*                    onChange={this.handleChange}*/}
              {/*                    disabled>*/}

              {/*                <option defaultValue>Choose Damage Type</option>*/}
              {/*                <option value="body">Bodily Injury</option>*/}
              {/*                <option value="auto">Auto Damage</option>*/}
              {/*                <option value="other">Other</option>*/}

              {/*            </select>*/}
              {/*        </div>*/}
              {/*      </div>*/}

              {/*  <div className="small-9 large-9">*/}
              {/*    <div className="input-group">*/}
              {/*      <span className="input-group-label">Accident Timing</span>*/}
              {/*      <select className="input-group-field"*/}
              {/*              ref="timing"*/}
              {/*              name="timing"*/}
              {/*              value={this.props.submission.timing}*/}
              {/*              onChange={this.handleChange}*/}
              {/*              disabled>*/}

              {/*          <option defaultValue>Choose Timing</option>*/}
              {/*          <option value="before">Before Reservation</option>*/}
              {/*          <option value="after">After Reservation</option>*/}
              {/*          <option value="during">During Reservation</option>*/}

              {/*      </select>*/}
              {/*    </div>*/}
              {/*  </div>*/}

              {/*  <div className="small-9 large-9">*/}
              {/*    <div className="input-group">*/}
              {/*        <span className="input-group-label"></span>*/}
              {/*        <textarea className="input-group-field"*/}
              {/*                  rows="5"*/}
              {/*                  ref="location"*/}
              {/*                  name="location"*/}
              {/*                  placeholder="Location of accident"*/}
              {/*                  onChange={this.handleChange}*/}
              {/*                  value={this.props.submission.location}*/}
              {/*                  disabled/>*/}
              {/*    </div>*/}
              {/*  </div>*/}

              {/*</div>*/}

            </div>

        <ConfirmAction submission={this.props.submission}
                   post={this.props.post}
                   toggleForm={this.props.toggleForm} />

    </div>
    );
  }
}

module.exports = ConfirmationForm;
