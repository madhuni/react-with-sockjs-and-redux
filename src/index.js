import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combineReducers } from "redux";

import App from './app.jsx';
import initialDataReducer from './store/reducers/initial-data';
import socketDataReducer from './store/reducers/socket-data';

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
    <App />
  </Provider>,
  dest
);
