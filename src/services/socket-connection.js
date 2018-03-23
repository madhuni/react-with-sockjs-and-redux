import { Component } from "react";
import sockjs from "sockjs-client";
import { connect } from "react-redux";

class SocketConnection extends Component {
  componentDidMount() {
    /* Setting up the URL for the sockjs */
    const sockJsURI = 'http://192.168.1.120:5000/sockjs';

    /* Making the new instance of the SockJS using the SockJS URI */
    const sock = new sockjs(sockJsURI);

    /* Opening the Socket Connection */
    sock.onopen = () => {
      console.log('onopen fn is called');
    };
    /* Adding the method which will trigger the update if anything happens */
    sock.onmessage = (e) => {
      // console.log('onmessage: ', e.data);
      for (const prop in e.data) {
        const data = e.data[prop];
        // console.log(data);
        if (prop === 'current') {
          const currentState = data.state.text;
          this.props.onUpdatePrinterState(currentState);

          if (data.temps.length !== 0) {
            const temps = data.temps[data.temps.length - 1];
            this.props.onUpdateTemps(temps);
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
    })}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnection);