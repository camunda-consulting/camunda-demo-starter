/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

const React = require('react');
// const ActionBar = require('SaveActionBar');
const WorkflowActionBar = require('WorkflowActionBar');


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
        this.props.onUpdateState(target, this.props.reading);
    }

    render() {
        //console.log("Detail Form: "+ JSON.stringify(this.props.submission));
        return (
          <div>
            <div className="my-form detail-form">
              <div className="small-12 large-12 small-offset-1 columns" >


                  <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">Systolic</span>
                          <input className="input-group-field"
                                 type="text"
                                 name="systolic"
                                 ref="systolic"
                                 onChange={this.handleChange}
                                 value={this.props.reading.systolic}
                          />
                      </div>
                  </div>

                  <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">Diastolic</span>
                          <input className="input-group-field"
                                 type="text"
                                 name="diastolic"
                                 ref="diastolic"
                                 onChange={this.handleChange}
                                 value={this.props.reading.diastolic} />
                      </div>
                  </div>
              </div>
            </div>

          <WorkflowActionBar submission={this.props.submission}
                             reading={this.props.reading}
                             workflow={this.props.workflow}
                             post={this.props.post}
                             toggleForm={this.props.toggleForm} />

    </div>
    );
  }
}

module.exports = DetailForm;
