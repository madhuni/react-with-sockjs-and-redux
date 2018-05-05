import React, { Component } from "react";
import sockjs from "sockjs-client";
import { connect } from "react-redux";

import axios from "axios";
import getToken from '../services/api/get-token';

// import getGcodeData from '../services/api/get-gcode-data';

class SocketConnection extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      flags: null,
      apiResponse: null,
      // gcodeData: null,
    };
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
        // console.log(currentData.state);
        switch (prop) {
          case 'connected':
            axios.defaults.headers.common['X-Api-Key'] = currentData['apikey'];
            break;
          
          case 'current':
            const currentState = currentData.state.text;
            const printProgress = currentData.progress;
            const flags = currentData.state.flags;
            // console.log(currentData);
            this.props.onUpdateSocketData(currentData);
            break;
          
          case 'event':
            const type = currentData['type'];
            const payload = currentData['payload'];

            switch (type) {
              case 'ToolChange':
                console.log(payload);
                break;
            
              case 'usb_status':
                console.log(type, payload);
                this.props.onUpdateUsbStatus(payload);
                break; 

              default:
                break;
            }
        
          default:
            return null;
            break;
        }
      }
    }
  }

  connect = (token) => {
    const sockJsURI = 'http://0.0.0.0:5000/sockjs';
    // const sockJsURI = 'http://192.168.1.137:5000/sockjs';
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

  resetSocketConnection = () => {
    const time = 1800; // time to rebuild the socket connection

    this.rebuildConnection = setInterval(() => {
      this.socket.close();
      this.connect("");
    }, time*1000);
  }

  /**
   * Exposing a function to re-create the Socket Connection. This function will be
   * called when the 'Sever' button available on the Home Page navigation will be clicked.
   * 
   * This function will first Disconnect the current Socket Connection and then
   * re-open a new Socket Connection.
   * 
   * This function is added in case if the server is not ready yet and the Application is
   * open, user can use the button to reconnect to the server to get the real time
   * update through the Socket data.
   */
  openSocketManually = () => {
    this.socket.close();
    this.connect("");
  }

  componentDidMount() {

    /**
     * Calling the 'onRef' function coming as props from the Parent Compnent
     * to set the 'this' keyword to the current class to access the functions of the
     * class outside of this class.
     * 
     * This method is being used because we are Exporting the 'SocketConnection'
     * Component wrapping around the 'connect' Higher-Order-Function. If we simply
     * export the Component then we will not need this work-around.
     */
    this.props.onRef(this);

    this.connect("");

    /* Setting a time interval for refreshing the Socket Connectoin */
    this.resetSocketConnection();

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
    onUpdateSocketData: (socketData) => {dispatch({
      type: 'UPDATE_SOCKET_DATA',
      value: socketData
    })},
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
    onUpdateUsbStatus: (status) => {dispatch({
      type: 'UPDATE_USB_STATUS',
      value: status
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