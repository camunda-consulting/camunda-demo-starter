/**
 * @author Paul Lungu
 * @type {{DOM, PropTypes, createElement, isValidElement, version, __spread, PureComponent, createMixin, createClass, Children, Component, createFactory, cloneElement}}
 */

'use strict';

// tag::nodeModules[]
const React = require('react');
const client = require('client');
const follow = require('follow'); // function to hop multiple links by "rel"

// tag::customComponents
const Detail = require('TaskDetail');
const List = require('TaskList');
// tag::customComponents

// tag::vars[]
const apiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}:${process.env.PLATFORM_API_PORT}/` : "/";
// end::vars[]

// tag::app[]
class main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {},
            tasks: null,
            displayDetail: "none",
            displayInfo: "none",
            displayList: "block",
            toggleDetailInfo: "off",
            callUpdate: function (filters, that) {
                that.loadTasksFromServer(filters)
            }
        };
        this.handleSelectedItem = this.handleSelectedItem.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.post = this.post.bind(this);
        this.loadTaskByBizKey = this.loadTaskByBizKey.bind(this);
        this.loadTaskById = this.loadTaskById.bind(this);
        this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
    }


    // tag::follow-1[]
    componentDidMount() {
        console.log("task=>home=>componentDidMount: "+this.props.businessKey);
        this.state.callUpdate("", this);
    }
    // end::follow-1[]

    loadTaskByBizKey(businessKey){
        client({
            method: 'GET',
            path: apiHost+"engine-rest/task",
            params: {processInstanceBusinessKey: businessKey},
            headers: {'Accept': 'application/json'}
        }).done(response => {
            console.log("task=>home=>loadTaskByBizKey: "+JSON.stringify(response))
            this.setState({
                task: response.entity[0]
            });
        });
    }

    loadTaskById(id){
        client({
            method: 'GET',
            path: apiHost+"engine-rest/task",
            params: {id: id},
            headers: {'Accept': 'application/json'}
        }).done(response => {
            console.log("task=>home=>loadTaskById: "+JSON.stringify(response))
            this.setState({
                task: response.entity[0]
            });
        });
    }

    loadTasksFromServer(filters){
        client({
            method: 'GET',
            path: apiHost+"engine-rest/task",
            params: {filters: filters},
            headers: {'Accept': 'application/json'}
        }).done(response => {
            console.log("task=>home=>loadTask(s)FromServer: "+JSON.stringify(response))
            this.setState({
                tasks: response.entity
            });
        });
    }
    handleApprove(e){
        e.preventDefault();

        this.props.history.push('/tasks#');
        this.handleBackClick();
    }

    handleReject(e){
        e.preventDefault();
        this.props.history.push('/rejected');
    }

    post(obj, context) {
        console.log("POST Started")
        client({
            method: 'POST',
            path: apiHost+context,
            entity: obj,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            console.log("POST Request Complete");
        });
    }

    handleSelectedItem(task) {
        if (task == null){
            alert("You don't have a task to complete. Please complete the service request first.");
        }else {
            task = this.loadTaskById(task.id);
            console.log("Merged Task: "+ JSON.stringify(task));
            this.setState({
                task: task,
                displayDetail: "block",
                displayList: "none"
            });
        }
    }

    render() {
      return (
        <div>

            {/*Display Task List*/}
            <div style={{display: this.state.displayList}}>
                <div className="top-bar show-for-medium small-12 columns">
                    <div className="top-bar-left">
                        <ul className="menu">
                            <li className="topbar-title">
                                Task List
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <List tasks={this.state.tasks}
                          onSelectedItem={this.handleSelectedItem}/>
                </div>
            </div>

          {/*  Display Task Details*/}
          <div style={{display: this.state.displayDetail}}>
            <div className="top-bar show-for-medium small-12 columns">
              <div className="top-bar-left">
                <ul className="menu">
                  <li className="topbar-title">
                     Task Detail
                  </li>
                </ul>
              </div>
            </div>
            <div>
                <Detail task={this.state.task}
                        displayInfo={this.state.displayInfo}
                        handleReject={this.handleReject}
                        handleApprove={this.handleApprove} />
            </div>
          </div>
        </div>
      )
    }
}
// end::app[]

module.exports = main;
