import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './external-storage.css';
import backBtn from '../../../assets/images/back-icon.svg';
import workInProgress from '../../../assets/images/work-in-progress.png';

import NavBar from '../../../components/nav-bar/nav-bar';

class ExternalStorage extends Component {

  render() {
    return (
      <div className="external-storage-container">
        <NavBar>
          <NavLink exact to="/">
            <img src={backBtn} alt="Back" width="56" height="56" />
          </NavLink>
          <h1 className="nav-heading nav-heading--external-storage">External Storage</h1>
        </NavBar>
        <img src={workInProgress} alt="Work In Progress" width="800" height="450"/>
      </div>
    );
  }
}

export default ExternalStorage;