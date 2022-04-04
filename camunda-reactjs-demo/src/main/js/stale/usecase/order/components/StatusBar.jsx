const React = require('react');
// const config = require("./config.json");
// const socket = require('socket.io-client').io();
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

// tag::vars[]
const wsHost = process.env.WS_HOST != "" ? `${process.env.WS_HOST}:${process.env.WS_PORT}/` : "/";
const apiHost = process.env.DATA_API_HOST != "" ? `${process.env.DATA_API_HOST}:${process.env.DATA_API_PORT}/` : "/";
const apiRoot = `${apiHost}${process.env.API_ROOT}`;
// end::vars[]

class StatusBar extends React.Component {

    interval: any;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            rejected: null,
            tasks: null
        }
        // this.events = this.events.bind(this);
    }

    async componentDidMount() {
        this.setState({isLoading: true});

        const request = interval(1000).pipe(
            startWith(0),
            switchMap(() =>
                fetch(apiHost+'policy/creditcheck/started')
                    .then((response) => response.json())
            ));

        request.subscribe((data: any) => {
            this.setState({rejected: data, isLoading: false});
        })


        // var clientWebSocket = new WebSocket("ws://localhost:8080/event-emitter");
        // clientWebSocket.onopen = function() {
        //     console.log("clientWebSocket.onopen", clientWebSocket);
        //     console.log("clientWebSocket.readyState", "websocketstatus");
        //     clientWebSocket.send("event-me-from-browser");
        // }
        // clientWebSocket.onclose = function(error) {
        //     console.log("clientWebSocket.onclose", clientWebSocket, error);
        //     this.events("Closing connection");
        // }
        // clientWebSocket.onerror = function(error) {
        //     console.log("clientWebSocket.onerror", clientWebSocket, error);
        //     this.events("An error occured");
        // }
        // clientWebSocket.onmessage = function(error) {
        //     console.log("clientWebSocket.onmessage", clientWebSocket, error);
        //     this.events(error.data);
        // }

    }

    // events(responseEvent) {
    //     console.log("event: " + responseEvent);
    // }

    render(){
        const {rejected, isLoading} = this.state;
        // console.log("Rejected Status: "+JSON.stringify(rejected));
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        var numRejected = 0;
        if(rejected) {
            numRejected = rejected.length;
        }

        return (
          <div>

              <div className="top-bar my-status-bar">
                  <div className="top-bar-left">
                      <ul className="menu">
                          <li className="menu-text">
                              <large><span style={{color: "#3adb76"}}>Status</span></large>
                          </li>
                      </ul>
                  </div>

                  <div className="top-bar-left">
                      <div className="menu small-4 large-4 columns text-center" style={{borderBottom: "1px dashed"}}>
                        <large>34</large>
                      </div>
                      <div className="menu small-4 large-4 columns text-center" style={{borderBottom: "1px dashed white"}}>
                          <large><span style={{color: "#3adb76"}}>{numRejected}</span></large>
                      </div>
                      <div className="menu small-4 large-4 columns text-center" style={{borderBottom: "1px dashed"}}>
                          <large>12</large>
                      </div>
                      <div className="menu small-4 large-4 columns text-center">
                        <small>Tasks</small>
                      </div>
                      <div className="menu small-4 large-4 columns text-center">
                          <small>Escalated</small>
                      </div>
                      <div className="menu small-4 large-4 columns text-center">
                          <small>Queues</small>
                      </div>
                  </div>
              </div>

            <div className="columns" style={{borderBottom: "0px solid white"}}></div>

          </div>
        );
      }
}

module.exports = StatusBar;
