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
  constructor(props) {
    super(props);

    this.init00 = null;
    this.isMouseDown = false;
  }
  /**
   * Accessing the API services for Homing and Moving Extruder/Bed
   */
  onHome = (command, axes) => {
    homeExtruderBed(command, axes);
  }

  onJogging = (axes, direction, speed) => {
    if (this.init00) {
      clearInterval(this.init00);
    }

    jogging(axes, direction, speed);
    this.isMouseDown = true;

    if (axes === 'x' || axes === 'y') {
      if (this.isMouseDown) {
        this.init00 = setInterval(() => {
          jogging(axes, direction, speed);
        }, 30);
      }
    } else if (axes === 'z') {
      if (this.isMouseDown) {
        this.init00 = setInterval(() => {
          jogging(axes, direction, speed);
        }, 420);
      }
    }
  }

  onStopJogging = () => {
    this.isMouseDown = false;
    clearInterval(this.init00);
    this.init00 = null;
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
            xLeft={() => this.onJogging("x", 1, 3)}
            stop={this.onStopJogging}
            xRight={() => this.onJogging("x", -1, 3)}
            yBack={() => this.onJogging("y", 1, 3)}
            yForward={() => this.onJogging("y", -1, 3)}
            home={() => this.onHome('home', ['x', 'y'])}
          />
          <ZControl
            zUp={() => this.onJogging("z", -1, 3)}
            zDown={() => this.onJogging("z", 1, 3)}
            home={() => this.onHome('home', 'z')}
            stop={this.onStopJogging}
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