import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";

import App from './app.jsx';
import initialDataReducer from './store/reducers/initial-data';
import socketDataReducer from './store/reducers/socket-data';
import './index.css';

/* Setting up the default settings for Axios */
axios.defaults.baseURL = 'http://0.0.0.0:5000/api/';
// axios.defaults.baseURL = 'http://192.168.1.150:5000/api/';
axios.defaults.headers.common['X-Api-Key'] = '';

/* Creating a 'rootReducer' with the mulitple reducers */
const rootReducer = combineReducers({
  initialData: initialDataReducer,
  socketData: socketDataReducer
});

/* Creating the Store for the Application */
const store = createStore(rootReducer);

const dest = document.getElementById('root');
ReactDOM.render(
  /* Sharing the 'store' with the whole Application with 'Provider' higher order function */
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  dest
);
