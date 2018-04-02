import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './manual-control.css';
import backBtn from '../../assets/images/back-icon.svg';

import homeExtruderBed from '../../services/api/home-extruder-bed';
import jogging from '../../services/api/jogging';

import NavBar from '../../components/nav-bar/nav-bar';
import XYControl from './components/xy-control/xy-control';
import ZControl from './components/z-control/z-control';

class ManualControl extends Component {
  /**
   * Accessing the API services for Homing and Moving Extruder/Bed
   */
  onHome = (command, axes) => {
    homeExtruderBed(command, axes);
  }

  onJogging = (axes, direction, speed) => {
    jogging(axes, direction, speed);
  }

  render() {
    return (
      <div className="manual-control-container">
        <NavBar>
          <NavLink exact to="/">
            <img src={backBtn} alt="Back" width="56" height="56"/>
          </NavLink>
          <h1 className="nav-heading">Manual Control</h1>
        </NavBar>
        <div className="control-area flex-row">
          <XYControl
            xLeft={() => this.onJogging("x", 1, 50)}
            xRight={() => this.onJogging("x", -1, 50)}
            yBack={() => this.onJogging("y", 1, 50)}
            yForward={() => this.onJogging("y", -1, 50)}
            home={() => this.onHome('home', ['x', 'y'])}
          />
          <ZControl
            zUp={() => this.onJogging("z", -1, 50)}
            zDown={() => this.onJogging("z", 1, 50)}
            home={() => this.onHome('home', 'z')}
          />
        </div>
        {/* <button onClick={() => this.onHome('home', ['x', 'y'])}>Home XY</button>
        <button onClick={() => this.onHome('home', 'z')}>Home Z</button>
        <button onClick={() => this.onJogging("x", -1, 50)}>{"<--"}X</button>
        <button onClick={() => this.onJogging("x", 1, 50)}>X{"-->"}</button>
        <button onClick={() => this.onJogging("y", -1, 50)}>Y Forward</button>
        <button onClick={() => this.onJogging("y", 1, 50)}>Y{"^"}</button>
        <button onClick={() => this.onJogging("z", -1, 50)}>{"^"}Z</button>
        <button onClick={() => this.onJogging("z", 1, 50)}>Z Down</button> */}
      </div>
    );
  }
}

export default ManualControl;