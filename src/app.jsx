import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Comp from "./container/comp";
import SocketConnection from './services/socket-connection';
import ReceiveUpdate from './container/receive-update';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let initialData = null;
    /**
     * Fetching the Initial Data once the App component is mounted
     * 
     * Once the initial data is fetched, this value will be set to
     * the State in our Redux Store.
    */
    axios.get('http://192.168.1.106:5000/')
      .then(res => {
        // console.log(res);
        initialData = res;
        /* Calling the Action Dispatch funtion */
        this.props.onInitialLoad(initialData);
      })
      .catch(err => {
        console.log(err);
      });
    
    /* Calling the socketData service once the app is mounted */
    // socketData();
  }

  render() {
    console.log(this.props.initialData);
    let appHeading;
    if (this.props.initialData) {
      appHeading = <h1>InitialData is set to somethings</h1>
    } else {
      appHeading = <h1>InitialData is still null</h1>
    }
    return (
      <div>
        {/* {appHeading} */}
        <SocketConnection />
        {/* <Comp /> */}
        <ReceiveUpdate />
      </div>
    );
  }
}

/* Subscribing to the Redux Store */

/* Mapping the State to the 'props' */
const mapStateToProps = (state) => {
  return {
    initialData: state.initialData.initialData
  }
};

/* Mapping the 'dispatch' fn to the 'props' */
const mapDispatchToProps = (dispatch) => {
  return {
    onInitialLoad: (initialData) => dispatch({type: 'ADD_INITIAL_DATA', value: initialData})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);