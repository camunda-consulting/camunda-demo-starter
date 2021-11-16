/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

const React = require('react');
const ActionBar = require('SaveActionBar');
const Task = require('TaskHome');


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

        //console.log("Detail Form: "+ JSON.stringify(this.props.submission));

        return (
          <div>

            <Task businessKey={this.props.submission.businessKey}/>

            <div className="my-form detail-form">

              {/*<div className="small-8 small-offset-2 large-8 large-offset-2 columns">*/}
              <div className="small-12 large-12 small-offset-1 columns" >

                <div className="small-9 large-9">
                    <div className="input-group">
                        <span className="input-group-label">Create Inspection Task</span>
                        <input className="input-group-field" type="checkbox"
                               name="inspection"
                               ref="inspection"
                               onChange={this.handleChange}
                               checked={false} />
                    </div>
                </div>

                  <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">Create Lot Release Task</span>
                          <input className="input-group-field" type="checkbox"
                                 name="lot_release"
                                 ref="lot_release"
                                 onChange={this.handleChange}
                                 checked={false} />
                      </div>
                  </div>

                  <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">Create In-Support Testing Task</span>
                          <input className="input-group-field" type="checkbox"
                                 name="in_support"
                                 ref="in_support"
                                 onChange={this.handleChange}
                                 checked={false} />
                      </div>
                  </div>

              </div>

            </div>

        <ActionBar submission={this.props.submission}
                   post={this.props.post}
                   toggleForm={this.props.toggleForm}
                   onRedirect={this.props.onRedirect}/>

    </div>
    );
  }
}

module.exports = DetailForm;
