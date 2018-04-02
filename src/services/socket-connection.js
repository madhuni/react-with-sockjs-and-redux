import { Component } from "react";
import sockjs from "sockjs-client";
import { connect } from "react-redux";

import axios from "axios";
import getToken from '../services/api/get-token';

class SocketConnection extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      socketData: null,
      apiResponse: null
    };

    // this.updateInterval = setInterval(this.sendUpdateToUI, 1000);
  }

  /**
   * A callback function to be called when AJAX call to an api will return
   * a response. This function will be passed to the API service call as
   * argument.
   */
  showApiMsg = () => {
    this.setState({
      ...this.state,
      apiResponse: 'API calling function is called separately'
    });
  }

  sendUpdateToUI = () => {
    if (this.state.socketData !== null) {
      for (const prop in this.state.socketData) {
        const currentData = this.state.socketData[prop];
        // console.log(currentData);
        switch (prop) {
          case 'connected':
            axios.defaults.headers.common['X-Api-Key'] = currentData['apikey'];
            break;
          
          case 'current':
            const currentState = currentData.state.text;
            const printProgress = currentData.progress;
            const flags = currentData.state.flags;
            this.props.onUpdatePrinterState(currentState);
            this.props.onUpdatePrintProgress(printProgress);
            this.props.onUpdateFlags(flags);

            if (currentData.temps.length !== 0) {
              const temps = currentData.temps[currentData.temps.length - 1];
              this.props.onUpdateTemps(temps);
            }

            if (currentData.job !== null) {
              const job = currentData.job;
              this.props.onUpdateJobDetails(job);
            }
            break;
          
          case 'event':
            const type = currentData['type'];
            const payload = currentData['payload']

            if (type === 'ToolChange') {
              console.log(payload);
              // this.props.onToolChange(payload);
            }
            break;
        
          default:
            return null;
            break;
        }
      }
    }
  }

  connect = (token) => {
    const sockJsURI = 'http://0.0.0.0:5000/sockjs';
    // const sockJsURI = 'http://192.168.1.108:5000/sockjs';
    var options = {
      debug: true
    };

    this.socket = new sockjs(sockJsURI+'?token='+token, undefined, options);
    this.socket.onopen = this._onopen.bind(this);
    this.socket.onmessage = this._onmessage.bind(this);
    this.socket.onclose = this._onclose.bind(this);
  }

  _onopen = (e) => {
    console.log('_onopen fn is called');
    console.log(e);
  }
  _onmessage = (e) => {
    // console.log('_onmessage fn is called');
    // console.log(e.data);
    this.setState({
      ...this.state,
      socketData: e.data
    });
    this.sendUpdateToUI();
  }
  _onclose = () => {
    this.sendUpdateToUI();
    console.log('_onclose fn is called');
  }

  componentDidMount() {
    // const wsToken = "eyJwdWJsaWNfa2V5IjpudWxsfQ.DZ-U-g.iVzQO6GqWEtwx0O_6EhB_91dEGA";
    this.connect("");
    /* Using the API service for getting the token */
    getToken(this.showApiMsg);
  }

  render() {
    return null;
  }
}

/* Subscribing to the STORE for real time updates */
const mapStateToProps = (state) => {
  return {
    socketData: state.socketData.socketData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePrinterState: (currentState) => {dispatch({
      type: 'UPDATE_PRINTER_STATE',
      value: currentState
    })},
    onUpdateTemps: (temps) => {dispatch({
      type: 'UPDATE_TEMPS',
      value: temps
    })},
    onUpdatePrintProgress: (printProgress) => {dispatch({
      type: 'UPDATE_PRINT_PROGRESS',
      value: printProgress
    })},
    onUpdateJobDetails: (job) => {dispatch({
      type: 'UPDATE_JOB_DETAILS',
      value: job
    })},
    onUpdateFlags: (flags) => {dispatch({
      type: 'UPDATE_FLAGS',
      value: flags
    })},
    onToolChange: (payload) => {dispatch({
      type: 'UPDATE_TOOL',
      value: 'tool0'
    })}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnection);