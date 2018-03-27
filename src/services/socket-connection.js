import { Component } from "react";
import sockjs from "sockjs-client";
import { connect } from "react-redux";

class SocketConnection extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      socketData: null
    };

    this.updateInterval = setInterval(this.sendUpdateToUI, 5000);
  }

  sendUpdateToUI = () => {
    console.log('Callback fn is called');
    if (this.state.socketData !== null) {
      for (const prop in this.state.socketData) {
        const currentData = this.state.socketData[prop];
        // console.log(JSON.stringify(data));
        if (prop === 'current') {
          const currentState = currentData.state.text;
          const printProgress = currentData.progress;
          this.props.onUpdatePrinterState(currentState);
          this.props.onUpdatePrintProgress(printProgress);
  
          if (currentData.temps.length !== 0) {
            const temps = currentData.temps[currentData.temps.length - 1];
            this.props.onUpdateTemps(temps);
          }
  
          if (currentData.job !== null) {
            const job = currentData.job;
            this.props.onUpdateJobDetails(job);
          }
          // console.log(currentState);
        }
      }
    }
  }

  componentDidMount() {
    /* Setting up the URL for the sockjs */
    // const sockJsURI = 'http://0.0.0.0:5000/sockjs';
    const sockJsURI = 'http://192.168.1.106:5001/sockjs';

    /* Making the new instance of the SockJS using the SockJS URI */
    const sock = new sockjs(sockJsURI);

    /* Opening the Socket Connection */
    sock.onopen = (e) => {
      console.log('onopen fn is called');
      sock.send('This is a test');
      console.log(e);
    };
    /* Adding the method which will trigger the update if anything happens */
    sock.onmessage = (e) => {
      this.setState({
        ...this.state,
        socketData: e.data
      });
    }
    /* This will be called when the connection is being closed */
    sock.onclose = () => {
      console.log('onclose fn is called');
      this.sendUpdateToUI();
      clearInterval(this.updateInterval);
    }
  }

  render() {
    return null;
  }
}

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
    })}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnection);