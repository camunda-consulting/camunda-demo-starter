/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

const React = require('react');
// const ActionBar = require('SaveActionBar');
const ConfirmActionBar = require('ConfirmActionBar');


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

        // var info = "";
        //
        // if (this.props.submission != null) {
        //     console.log("Info Render: "+JSON.stringify(this.props.submission));
        //
        //     info =  <div>
        //         <h5>Select tasks to start or cancel</h5>
        //     </div>
        //
        // }else {
        //     info =  <div>
        //         <h4>No workflow found!</h4>
        //         <h5>Select tasks below a *new* workflow will be started</h5>
        //     </div>
        //
        // }

        return (
          <div>

            <div className="my-form detail-form">
              {/*<div className="small-8 small-offset-2 large-8 large-offset-2 columns">*/}
              <div className="small-12 large-12 small-offset-1 columns" >

                  {/*{info}*/}

                {/*<div className="small-9 large-9">*/}
                {/*    <div className="input-group">*/}
                {/*        <span className="input-group-label">Inspection Task</span>*/}
                {/*        <input className="input-group-field" type="checkbox"*/}
                {/*               name="inspection"*/}
                {/*               ref="inspection"*/}
                {/*               onChange={this.handleChange}*/}
                {/*               checked={this.props.submission.inspection} />*/}
                {/*    </div>*/}
                {/*</div>*/}

                  <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">Systolic</span>
                          <input className="input-group-field" type="text"
                                 ref="repName" onChange={this.handleChange}
                          />
                      </div>
                  </div>

                  <div className="small-9 large-9">
                      <div className="input-group">
                          <span className="input-group-label">Diastolic</span>
                          <input className="input-group-field" type="text"
                                 ref="repName" onChange={this.handleChange} />
                                 {/*// value={} />*/}
                      </div>
                  </div>

              </div>

            </div>

        {/*<ActionBar submission={this.props.submission}*/}
        {/*           post={this.props.post}*/}
        {/*           toggleForm={this.props.toggleForm}*/}
        {/*           onRedirect={this.props.onRedirect}/>*/}

              <ConfirmActionBar submission={this.props.submission}
                                post={this.props.post}
                                toggleForm={this.props.toggleForm} />

    </div>
    );
  }
}

module.exports = DetailForm;
