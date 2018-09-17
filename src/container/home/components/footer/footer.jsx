import React from 'react';
import { NavLink } from 'react-router-dom';

import './footer.css';
import preheatIcon from '../../../../assets/images/preheat-icon.svg';
import arrowIcon from '../../../../assets/images/arrow-icon.svg';
import NavLinkBtn from '../../../../components/nav-link-btn/nav-link-btn';
import Button from '../../../../components/button/button';

const footer = (props) => {
  let reconnectClass;
  let btnName;
  let showPreheat;

  if (props.flags !== null) {
    if (props.flags.printing || props.flags.paused || props.flags.operational) {
      reconnectClass = ['btn--control btn--green'];
      btnName = 'Connected';
    } else {
      reconnectClass = ['btn--control btn--danger'];
      btnName = 'Re-Connect'
    }

    if (props.flags.printing || props.flags.paused) {
      showPreheat = false;
    } else {
      showPreheat = true;
    }
  } else {
    reconnectClass = ['btn--disable'];
    btnName = 'Connected'
  }

  return (
    <footer className="footer">
      <div className="route-btn route-btn--footer flex-row">
        <NavLink to="/control">
          <img src={arrowIcon} alt="Preheat Icon" width="30" height="30" />
          <span>Control</span>
        </NavLink>
      </div>
      {
        showPreheat ?
        <div className="route-btn route-btn--footer flex-row">
          <NavLink to="/preheat">
            <img src={preheatIcon} alt="Preheat Icon" width="30" height="30" />
            <span>Preheat</span>
          </NavLink>
        </div> :
        null
      }
      <div className="controls flex-row">
        <Button classValue={'btn--control btn--small-text'} name={'Connet Server'} clicked={props.reconnectServer} />
        <Button classValue={reconnectClass.join(' ')} name={btnName} clicked={props.reconnectPrinter} />
      </div>
    </footer>
  );
};

export default footer;