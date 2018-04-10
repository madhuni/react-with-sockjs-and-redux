import React from 'react';
import { NavLink } from 'react-router-dom';

import './nav-bar.css'

import forwardIcon from '../../../../assets/images/forward-icon.png';
import powerbtn from '../../../../assets/images/power-icon.svg';

import Button from '../../../../components/button/button';

const navBar = (props) => {
  let reconnectClass;
  let btnName;

  if (props.flags !== null) {
    if (props.flags.printing || props.flags.paused || props.flags.operational) {
      reconnectClass = ['btn--control btn--green'];
      btnName = 'Connected';
    } else {
      reconnectClass = ['btn--control btn--danger'];
      btnName = 'Re-Connect'
    }
  } else {
    reconnectClass = ['btn--disable'];
    btnName = 'Connected'
  }

  return (
    <nav className="nav-bar flex-row">
      <h1 className="current-state">Status: {props.currentState}</h1>
      <div className="shutdown-btn">
        <img src={powerbtn} alt="Power" width="36" height="36" onClick={props.shutdown}/>
      </div>
      <div className="controls flex-row">
        <Button classValue={'btn--control'} name={'Connet Server'} clicked={props.reconnectServer}/>
        <Button classValue={reconnectClass.join(' ')} name={btnName} clicked={props.reconnectPrinter}/>
      </div>
      <div className="route-btn flex-row">
        <NavLink to='/control'>
          Controls 
        </NavLink>
        <img src={forwardIcon} alt="Forward" width="36" height="36" />
      </div>
    </nav>
  );
};

export default navBar;