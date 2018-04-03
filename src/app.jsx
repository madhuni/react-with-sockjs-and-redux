import React, { Component } from "react";
import { connect } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom'; 

import SocketConnection from './services/socket-connection';
import Home from './container/home/home';
import getInitialData from './services/api/get-initial-data';
import ManualControl from './container/manual-control/manual-control';

class App extends Component {
  onGetInitialData = (res) => {
    const initialData = res;
    this.props.onInitialLoad(initialData);
  }

  componentDidMount() {
    /**
     * Fetching the Initial Data once the App component is mounted
    */
    getInitialData(this.onGetInitialData);
  }

  render() {
    let appHeading;
    if (this.props.initialData) {
      appHeading = <h1>InitialData is set to somethings</h1>
    } else {
      appHeading = <h1>InitialData is still null</h1>
    }
    return (
      <div>
        <div className="app">
          <SocketConnection />
          <Switch>
            <Route path="/control" exact component={ManualControl} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));