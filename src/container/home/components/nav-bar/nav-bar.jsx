import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './nav-bar.css'

import forwardIcon from '../../../../assets/images/forward-icon.png'

import Button from '../../../../components/button/button';

const navBar = (props) => {
  return (
    <nav className="nav-bar flex-row">
      <h1 className="current-state">Status: {props.currentState}</h1>
      <div className="controls">
        <Button classValue={"btn--control btn--green"} name={"Connect"} clicked={props.reconnectPrinter}/>
        <Button classValue={"btn--control"} name={"Tool-0"} clicked={props.tool0}/>
        <Button classValue={"btn--control"} name={"Tool-1"} clicked={props.tool1}/>
      </div>
      <div className="route-btn">
        <NavLink to='/control'>
          Controls {"-->"}
        </NavLink>
      </div>
    </nav>
  );
};

export default navBar;