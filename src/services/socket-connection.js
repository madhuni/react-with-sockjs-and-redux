import { Component } from "react";
import sockjs from "sockjs-client";
import { connect } from "react-redux";

class SocketConnection extends Component {
  componentDidMount() {
    /* Setting up the URL for the sockjs */

    // const sockJsURI = 'http://192.168.1.106:5000/sockjs';
    const sockJsURI = 'http://0.0.0.0:5000/sockjs';
    const wsToken = 'eyJwdWJsaWNfa2V5IjoiZWFlNTY4NzU5ZTM2NDg1Y2FhZDllYWFlZTdiZDQ3MDUifQ.DZawOg.pULPuA-B5OVYb0O82xQVEjbTqBk';

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
      // console.log('onmessage: ', e.data);
      for (const prop in e.data) {
        const data = e.data[prop];
        // console.log(JSON.stringify(data));
        if (prop === 'current') {
          const currentState = data.state.text;
          const printProgress = data.progress;
          this.props.onUpdatePrinterState(currentState);
          this.props.onUpdatePrintProgress(printProgress);

          if (data.temps.length !== 0) {
            const temps = data.temps[data.temps.length - 1];
            this.props.onUpdateTemps(temps);
          }

          if (data.job !== null) {
            const job = data.job;
            this.props.onUpdateJobDetails(job);
          }
          // console.log(currentState);
        }
      }
    }
    /* This will be called when the connection is being closed */
    sock.onclose = () => {
      console.log('onclose fn is called');
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