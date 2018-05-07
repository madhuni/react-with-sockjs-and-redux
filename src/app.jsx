import React, { Component } from "react";
import { connect } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom'; 

import SocketConnection from './services/socket-connection';
import Home from './container/home/home';
import getInitialData from './services/api/get-initial-data';
import ManualControl from './container/manual-control/manual-control';
import ExternalStorage from './container/storage-control/external-storage/external-storage';
import InternalStorage from './container/storage-control/internal-storage/internal-storage';
import Preheat from './container/preheat/preheat';

class App extends Component {
  onGetInitialData = (res) => {
    const initialData = res;
    this.props.onInitialLoad(initialData);
  }

  /**
   * If we need to send any kind of 'props' to a Component while routing,
   * we can create a function which will return the particular Component
   * we need on routing, and can pass whatever 'props' we want to pass to
   * a particular Component while routing.
   * 
   * Below 'returnHomeComponent' function is returning the <Home /> component
   * while adding 'something' as props which will be available to the HOME
   * component when it will mount.
   */
  returnHomeComponent = (props) => {
    return (
      <Home serverClicked={this.onServerClicked} {...props} />
    );
  }

  onServerClicked = () => {
    this._child.openSocketManually();
    // console.log(this._child);
  }

  componentDidMount() {
    /**
     * Fetching the Initial Data once the App component is mounted
    */
    getInitialData(this.onGetInitialData);
  }

  render() {
    return (
      <div>
        <div className="app">
          {/*
            * To access the functions available on the SocketConnection
            * class component, we took the help of 'refs'. But as this
            * component is not a direct component, instead it is been exported
            * by 'connect' Higher-Order-Componet, so we can't use the direct
            * 'ref' attribute for defiing the 'refs' for this particular
            * component.
            * 
            * Instead we use the 'onRef' props, which is a function which
            * will be triggered by the 'SocketConnection' component's
            * 'componentDidMount' method and it will set the value of
            * 'child' to 'this' which will be the component class itself.
            * In this way we will get the reference of the 'SocketConnection'
            * class to the '_child' property of App component and then we
            * can use any method of that class anytime.
          */}
          <SocketConnection onRef={(child) => {
            this._child = child;
            // console.log(child);
          }} />
          <Switch>
            <Route path="/control" component={ManualControl} />
            <Route path="/internal-storage" component={InternalStorage} />
            <Route path="/external-storage" component={ExternalStorage} />
            <Route path="/preheat" component={Preheat} />
            {/* Calling the 'returnHomeComponent' funtion to return the HOME component on route */}
            <Route path="/" exact component={this.returnHomeComponent} />
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